import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { SessionManagementService } from '../../../shared/services/auth.service';
import { OwnersResponse, UsersResponse } from '../../models/admin/users.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient, private sessionManagementService: SessionManagementService) { }

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/admin/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.access_token) {
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

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('adminToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getToken(): string | null {
    const token = localStorage.getItem('adminToken');
    return token;
  }

  removeToken(): void {
    this.sessionManagementService.clearCurrentUserType();
    localStorage.removeItem('adminToken');
  }

  getVerifiedUsers(page: number = 1, limit: number = 5): Observable<UsersResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<UsersResponse>(`${this.apiUrl}/admin/verified-users`, {
      headers: this.getHeaders(),
      params: params
    });
  }

  getVerifiedOwners(page: number = 1, limit: number = 5): Observable<OwnersResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<OwnersResponse>(`${this.apiUrl}/admin/verified-owners`, {
      headers: this.getHeaders(),
      params: params
    });
  }

  toggleUserBlock(userId: string, isBlocked: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/toggle-user-block/${userId}`, { isBlocked }, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  toggleOwnerBlock(ownerId: string, isBlocked: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/toggle-owner-block/${ownerId}`, { isBlocked }, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}