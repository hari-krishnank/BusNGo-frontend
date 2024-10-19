import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CancelledBookingService {
    private backendURL = environment.backendUrl;

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('userToken');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    constructor(private http: HttpClient) { }

    getAllCancelledBookings(): Observable<any> {
        return this.http.get(`${this.backendURL}/profile/cancelledBookings`, { headers: this.getHeaders() });
    }
}