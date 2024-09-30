import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { SessionManagementService } from '../../../shared/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class StaffAuthService {
    private apiUrl = `${environment.backendUrl}/staff`

    constructor(private http: HttpClient, private router: Router, private sessionManagementService: SessionManagementService) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(response => {
                if (response && response.access_token) {
                    localStorage.setItem('staff_token', response.access_token);
                    this.sessionManagementService.setCurrentUserType('staff');
                }
            })
        );
    }

    logout() {
        this.sessionManagementService.clearCurrentUserType();
        localStorage.removeItem('staff_token');
        this.router.navigate(['/staffLogin']);
    }

    getToken(): string | null {
        return localStorage.getItem('staff_token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}