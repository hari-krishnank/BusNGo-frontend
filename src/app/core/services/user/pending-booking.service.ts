import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class PendingBookingService {
    private backendURL = environment.backendUrl

    constructor(private http: HttpClient) { }

    createPendingBooking(bookingData: any): Observable<any> {
        return this.http.post(`${this.backendURL}/bookings/pending-booking`, bookingData);
    }

    getPendingBooking(bookingId: string): Observable<any> {
        return this.http.get(`${this.backendURL}/bookings/pending-booking/${bookingId}`);
    }
}