import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SessionManagementService } from '../../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class signupService {
  private apiUrl = 'http://localhost:3000';
  private readonly EMAIL_KEY = 'ownerEmail';
  private readonly TOKEN_KEY = 'ownerToken';

  constructor(private http: HttpClient, private sessionManagementService: SessionManagementService) { }

  sendOtp(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/owner/otp`, { email });
  }

  verifyOtp(email: string, otp: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/owner/verify-otp`, { email, otp });
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