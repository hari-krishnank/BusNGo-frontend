import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class CompletedBookingService {
    private backendURL = environment.backendUrl;

    constructor(private http: HttpClient) { }

    getCompletedBooking(bookingId: string): Observable<any> {
        return this.http.get(`${this.backendURL}/payments/completed-booking/${bookingId}`);
    }
}