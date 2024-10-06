import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private apiUrl = environment.backendUrl;
  private readonly EMAIL_KEY = 'ownerEmail';

  constructor(private http: HttpClient) { }

  sendOtp(email: string): Observable<string> {
    return this.http.post<void>(`${this.apiUrl}/owner/otp`, { email }).pipe(
      map(() => 'OTP sent successfully'),
      catchError(this.handleError)
    );
  }

  verifyOtp(email: string, otp: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/owner/verify-otp`, { email, otp }).pipe(
      map(() => 'OTP Verified successfully'),
      catchError(this.handleError)
    );
  }

  resendOtp(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/owner/resend-otp`, { email });
  }

  getOwnerDetails(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/owner/details?email=${email}`);
  }

  confirmOwnerDetails(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/owner/confirm-details`, { email });
  }

  setEmail(email: string): void {
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  getEmail(): string {
    return localStorage.getItem(this.EMAIL_KEY) || '';
  }

  removeEmail(): void {
    localStorage.removeItem(this.EMAIL_KEY);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.message || error.statusText;
    }
    return throwError(() => errorMessage);
  }
}