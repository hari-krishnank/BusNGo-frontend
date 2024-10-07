import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class OwnerApiService {
    private apiUrl = environment.backendUrl;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    updateOwnerDetails(ownerDetails: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/owner/update-details`, ownerDetails, { headers: this.getHeaders() });
    }

    getOwnerEmail(): string | null {
        return localStorage.getItem('ownerEmail');
    }
}