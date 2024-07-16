import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development.js';
import { IOtpVerificationResponse, IRegistrationResponse } from '../../models/user/register.js';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private backendURL = environment.backendUrl

  constructor(private httpclient: HttpClient) { }

  initiateRegistration(username: string, email: string, phone: string, password: string): Observable<IRegistrationResponse> {
    return this.httpclient.post<IRegistrationResponse>(`${this.backendURL}/users/register`, {
      username,
      email,
      phone,
      password
    }).pipe(
      catchError((error) => {
        if (error.status === 400 && error.error.message === 'Email already registered') {
          return throwError(() => new Error('Email already registered'));
        }
        return throwError(() => new Error('An error occurred during registration'));
      })
    )
  }

  verifyOtp(email: string, otp: number): Observable<IOtpVerificationResponse> {
    return this.httpclient.post<IOtpVerificationResponse>(`${this.backendURL}/users/verify-otp`, {
      email,
      otp
    }).pipe(
      catchError((error) => {
        return throwError(() => new Error('An error occurred during OTP verification'));
      })
    );
  }

  resendOtp(email: string): Observable<any> {
    return this.httpclient.post<any>(`${this.backendURL}/users/resend-otp`, { email }).pipe(
      catchError((error) => {
        return throwError(() => new Error('An error occurred while resending OTP'));
      })
    );
  }
}