import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SessionManagementService } from '../../../../shared/services/auth.service';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class signupService {
  private apiUrl = environment.backendUrl;
  private readonly EMAIL_KEY = 'ownerEmail';
  private readonly TOKEN_KEY = 'ownerToken';
  private otpVerified: boolean = false;

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.message || error.statusText;
    }
    return throwError(() => errorMessage);
  }

  constructor(private http: HttpClient, private sessionManagementService: SessionManagementService) { }

  sendOtp(email: string): Observable<string> {
    return this.http.post<void>(`${this.apiUrl}/owner/otp`, { email }).pipe(
      map(response => 'OTP sent successfully'),
      catchError(this.handleError)
    );
  }

  verifyOtp(email: string, otp: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/owner/verify-otp`, { email, otp }).pipe(
      map(response => 'OTP Verified successfully'),
      catchError(this.handleError)
    );
  }

  setOtpVerified(status: boolean): void {
    this.otpVerified = status;
  }

  isOtpVerified(): boolean {
    return this.otpVerified;
  }

  resendOtp(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/owner/resend-otp`, { email });
  }

  setEmail(email: string): void {
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  getEmail(): string {
    return localStorage.getItem(this.EMAIL_KEY) || '';
  }

  removeEmail(): void {
    return localStorage.removeItem(this.EMAIL_KEY)
  }

  getOwnerDetails(): Observable<any> {
    const email = this.getEmail();
    return this.http.get(`${this.apiUrl}/owner/details`, { params: { email } });
  }

  confirmOwnerDetails(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/owner/confirm-details`, { email });
  }

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/owner/login`, loginData).pipe(
      tap(response => {
        if (response && response.access_token) {
          console.log('Owner login respose token', response);

          this.setToken(response.access_token);
          this.setEmail(loginData.email);
          this.sessionManagementService.setCurrentUserType('owner');
        }
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    this.sessionManagementService.clearCurrentUserType();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}