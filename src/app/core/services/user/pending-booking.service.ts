import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class PendingBookingService {
    private backendURL = environment.backendUrl

    constructor(private http: HttpClient) { }
 
    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('userToken');
        console.log('userToken:', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }

    createPendingBooking(bookingData: any): Observable<any> {
        return this.http.post(`${this.backendURL}/bookings/pending-booking`, bookingData, { headers: this.getHeaders() });
    }

    getPendingBooking(bookingId: string): Observable<any> {
        return this.http.get(`${this.backendURL}/bookings/pending-booking/${bookingId}`);
    }
} 