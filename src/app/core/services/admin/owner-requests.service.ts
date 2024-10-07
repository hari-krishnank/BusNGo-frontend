import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class OwnerRequestsService {
    private apiUrl = environment.backendUrl + '/admin';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('adminToken');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getOwnerRegistrationRequests(page: number = 1, limit: number = 5): Observable<any> {
        return this.http.get(`${this.apiUrl}/owner-registration-requests?page=${page}&limit=${limit}`, { headers: this.getHeaders() });
    }

    getRejectedOwnerRequests(page: number = 1, limit: number = 5): Observable<any> {
        return this.http.get(`${this.apiUrl}/rejected-owner-requests?page=${page}&limit=${limit}`, { headers: this.getHeaders() });
    }

    approveOwnerRegistration(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/approve-owner-registration/${email}`, {}, { headers: this.getHeaders() });
    }

    rejectOwnerRegistration(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/reject-owner-registration/${email}`, {}, { headers: this.getHeaders() });
    }

    getPendingRequestsCount(): Observable<number> {
        return this.http.get<{ count: number }>(`${this.apiUrl}/pending-owner-requests-count`, { headers: this.getHeaders() }).pipe(map(response => response.count));
    }
}