import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
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
        tap(response => {
          this.setToken(response.access_token);
          this.setUserInfo(response.user);
        }),
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
    localStorage.setItem('userToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  setUserInfo(user: any): void {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  getUserInfo(): any {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    this.toastr.info('You have been logged out successfully', 'Logged Out');
  }
}