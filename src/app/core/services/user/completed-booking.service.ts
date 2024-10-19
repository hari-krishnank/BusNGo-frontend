import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class CompletedBookingService {
    private backendURL = environment.backendUrl;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('userToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getCompletedBooking(bookingId: string): Observable<any> {
        return this.http.get(`${this.backendURL}/payments/completed-booking/${bookingId}`);
    }

    getAllCompletedBookings(): Observable<any> {
        return this.http.get(`${this.backendURL}/profile`, { headers: this.getHeaders() });
    }

    getBookingByBookingId(bookingId: string): Observable<any> {
        return this.http.get<any>(`${this.backendURL}/profile/booking/${bookingId}`, { headers: this.getHeaders() });
    }

    cancelBooking(bookingId: string): Observable<any> {
        return this.http.post<any>(`${this.backendURL}/profile/booking/${bookingId}/cancel`, {}, { headers: this.getHeaders() });
    }
}