import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ILoginResponse } from '../../models/user/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private backendURL = environment.backendUrl

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.backendURL}/auth/login`, { email, password })
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          if (error.status === 401) {
            return throwError(() => new Error('Invalid email or password'));
          }
          return throwError(() => new Error('An unexpected error occurred'));
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

  logout(): void {
    localStorage.removeItem('token');
  }
}