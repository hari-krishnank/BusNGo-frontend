import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class signupService {
    private apiUrl = 'http://localhost:3000';
    private readonly EMAIL_KEY = 'ownerEmail';

    constructor(private http: HttpClient) { }

    sendOtp(email: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/owner/otp`, { email });
    }

    verifyOtp(email: string, otp: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/owner/verify-otp`, { email, otp });
    }

    
  setEmail(email: string): void {
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  getEmail(): string {
    return localStorage.getItem(this.EMAIL_KEY) || '';
  }
}