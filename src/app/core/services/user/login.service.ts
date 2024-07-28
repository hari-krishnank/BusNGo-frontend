import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ILoginResponse } from '../../models/user/login.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private backendURL = environment.backendUrl

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  login(email: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.backendURL}/auth/login`, { email, password })
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          if (error.status === 401) {
            if (error.error && error.error.message === 'Your account has been blocked. Please contact support.') {
              return throwError(() => new Error('ACCOUNT_BLOCKED'));
            }
            return throwError(() => new Error('INVALID_CREDENTIALS'));
          }
          return throwError(() => new Error('UNEXPECTED_ERROR'));
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  checkUserBlockStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.backendURL}/auth/check-block-status`)
      .pipe(
        catchError(error => {
          console.error('Error checking user block status:', error);
          return throwError(() => new Error('Failed to check user block status'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.toastr.info('You have been logged out successfully', 'Logged Out');
  }
}