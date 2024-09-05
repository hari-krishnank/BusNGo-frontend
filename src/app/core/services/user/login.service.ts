import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ILoginResponse } from '../../models/user/login.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private backendURL = environment.backendUrl
  private loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public loginStatus$ = this.loginStatusSubject.asObservable();
  private isBlocked: boolean = false;

  constructor(private http: HttpClient, private message: NzMessageService, private router: Router) { }

  login(email: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.backendURL}/auth/user/login`, { email, password })
      .pipe(
        tap(response => {
          console.log('normal login response', response);
          this.setToken(response.access_token);
          this.setUserInfo(response.user);
        }),
        catchError(error => this.handleLoginError(error))
      );
  }

  private handleLoginError(error: any): Observable<never> {
    if (error.status === 401 && error.error?.message === 'Your account has been blocked. Please contact support.') {
      return throwError(() => new Error('ACCOUNT_BLOCKED'));
    }
    if (error.status === 401) {
      return throwError(() => new Error('INVALID_CREDENTIALS'));
    }
    return throwError(() => new Error('UNEXPECTED_ERROR'));
  }

  googleLogin(credential: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.backendURL}/auth/user/google-login`, { credential })
      .pipe(
        tap(response => {
          console.log('response kitti', response);
          this.setToken(response.access_token);
          this.setUserInfo(response.user);
        }),
        catchError(error => {
          console.error('Google login error:', error);
          return throwError(() => new Error('GOOGLE_LOGIN_ERROR'));
        })
      );
  }

  setToken(token: string): void {
    localStorage.setItem('userToken', token);
    this.loginStatusSubject.next(true);
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
    localStorage.removeItem('searchData');
    this.loginStatusSubject.next(false);
    if (!this.isBlocked) {
      this.message.success('You have been logged out successfully..!');
    }
    this.isBlocked = false
  }

  blockedLogout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('searchData');
    this.loginStatusSubject.next(false);
    this.router.navigate(['/userLogin'])
    this.isBlocked = false
  }
}