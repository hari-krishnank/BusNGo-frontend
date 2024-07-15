import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/admin/login`, { email, password });
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
    localStorage.removeItem('adminToken');
  }
}