import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { SessionManagementService } from '../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private sessionManagementService: SessionManagementService) { }

  // login(email: string, password: string): Observable<{ access_token: string }> {
  //   return this.http.post<{ access_token: string }>(`${this.apiUrl}/admin/login`, { email, password });
  // }

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/admin/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.access_token) {
            // this.setToken(response.access_token);
            this.sessionManagementService.setCurrentUserType('admin');
          }
        })
      );
  }

  verifyToken(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return of(false);
    }
    return this.http.get(`${this.apiUrl}/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getToken(): string | null {
    const token = localStorage.getItem('adminToken');
    console.log('Retrieved token:', token);
    return token;
  }

  removeToken(): void {
    this.sessionManagementService.clearCurrentUserType();
    localStorage.removeItem('adminToken');
  }

  getVerifiedUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/verified-users`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  getVerifiedOwners(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/verified-owners`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  toggleUserBlock(userId: string, isBlocked: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/toggle-user-block/${userId}`, { isBlocked }, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}