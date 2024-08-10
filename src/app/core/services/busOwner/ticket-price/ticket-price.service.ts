import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class TicketPriceService {
    private apiUrl = `${environment.backendUrl}/ticket-prices`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getTicketPrices(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    addTicketPrice(ticketPriceData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, ticketPriceData, { headers: this.getHeaders() });
    }
}