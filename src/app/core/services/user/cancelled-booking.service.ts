import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

    getAllCancelledBookings(page: number, limit: number, sort: string): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('sort', sort);

        return this.http.get(`${this.backendURL}/profile/cancelledBookings`, {
            headers: this.getHeaders(),
            params: params
        });
    }
}