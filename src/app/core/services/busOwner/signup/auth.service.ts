import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { SessionManagementService } from '../../../../shared/services/auth.service';
import { environment } from '../../../../../environments/environment.development';
import { Router } from '@angular/router';
import { MessageService } from '../../../../shared/services/message.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.backendUrl;
    private readonly TOKEN_KEY = 'ownerToken';

    constructor(private http: HttpClient, private sessionManagementService: SessionManagementService, private router: Router, private message: MessageService) { }

    login(loginData: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/auth/owner/login`, loginData).pipe(
            tap(response => {
                if (response && response.access_token) {
                    this.setToken(response.access_token);
                    this.sessionManagementService.setCurrentUserType('owner');
                }
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

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.sessionManagementService.clearCurrentUserType();
        this.router.navigate(['/ownerLogin']);
    }

    blockedLogout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.sessionManagementService.clearCurrentUserType();
        this.message.showErrorMessage('Your account has been blocked. Please contact support.');
        this.router.navigate(['/ownerLogin']);
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
} 