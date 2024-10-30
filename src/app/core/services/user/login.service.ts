import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ILoginResponse } from '../../models/user/login.interface';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { SessionManagementService } from '../../../shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private backendURL = environment.backendUrl;
    private loginStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    public loginStatus$ = this.loginStatusSubject.asObservable();
    private isBlocked: boolean = false;
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient, private message: NzMessageService, private router: Router, private sessionManagementService: SessionManagementService) {
        this.checkTokensOnInit();
    }

    login(email: string, password: string): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${this.backendURL}/auth/user/login`, { email, password })
            .pipe(
                tap(response => {
                    this.handleSuccessfulAuth(response);
                }),
                catchError(error => this.handleLoginError(error))
            );
    }

    googleLogin(credential: string): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${this.backendURL}/auth/user/google-login`, { credential })
            .pipe(
                tap(response => {
                    this.handleSuccessfulAuth(response);
                }),
                catchError(error => {
                    console.error('Google login error:', error);
                    return throwError(() => new Error('GOOGLE_LOGIN_ERROR'));
                })
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

    refreshToken(): Observable<ILoginResponse> {
        if (this.refreshTokenInProgress) {
            return new Observable(observer => {
                this.refreshTokenSubject.subscribe({
                    next: (token) => {
                        if (token) {
                            observer.next(token);
                            observer.complete();
                        }
                    },
                    error: (err) => {
                        observer.error(err);
                    }
                });
            });
        }

        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);

        return this.http.post<ILoginResponse>(`${this.backendURL}/auth/user/refresh`, {
            refreshToken: this.getRefreshToken()
        }).pipe(
            tap((response: ILoginResponse) => {
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(response);
                this.handleSuccessfulAuth(response);
            }),
            catchError((error) => {
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.error(error);
                this.logout();
                return throwError(() => error);
            })
        );
    }

    private handleSuccessfulAuth(response: ILoginResponse): void {
        console.log(response);

        if (response.access_token) {
            this.setToken(response.access_token);
            this.setRefreshToken(response.refresh_token);
            this.setUserInfo(response.user);
            this.sessionManagementService.setCurrentUserType('user');
            this.loginStatusSubject.next(true);
        }
    }

    private checkTokensOnInit(): void {
        const token = this.getToken();
        const refreshToken = this.getRefreshToken();
        if (token && refreshToken) {
            this.loginStatusSubject.next(true);
        } else {
            this.loginStatusSubject.next(false);
        }
    }

    setToken(token: string): void {
        localStorage.setItem('userToken', token);
        this.loginStatusSubject.next(true);
    }

    getToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    setRefreshToken(token: string): void {
        localStorage.setItem('refreshToken', token);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    setUserInfo(user: any): void {
        console.log(user);
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
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('searchData');
        this.loginStatusSubject.next(false);
        this.sessionManagementService.clearCurrentUserType();
        if (!this.isBlocked) {
            this.message.success('You have been logged out successfully..!');
        }
        this.isBlocked = false
    }

    blockedLogout(): void {
        this.isBlocked = false
        this.router.navigate(['/user/login'])
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('searchData');
        this.loginStatusSubject.next(false);
        this.message.error('Your account has been blocked. Please contact support.')
        this.sessionManagementService.clearCurrentUserType();
    }

    forgotPassword(email: string): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.backendURL}/users/forgot-password`, { email })
            .pipe(
                tap(response => {
                    this.message.success(response.message);
                }),
                catchError(error => {
                    this.message.error('An error occurred. Please try again later.');
                    return throwError(() => new Error('FORGOT_PASSWORD_ERROR'));
                })
            );
    }

    resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.backendURL}/users/reset-password`, { token, newPassword })
            .pipe(
                tap(response => {
                    // console.log(response);
                }),
                catchError(error => {
                    return throwError(() => new Error('RESET_PASSWORD_ERROR'));
                })
            );
    }
}