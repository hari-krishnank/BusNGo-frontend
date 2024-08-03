import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class TicketPriceService {
    private apiUrl = `${environment.backendUrl}/ticket-prices`;

    constructor(private http: HttpClient) { }

    getTicketPrices(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addTicketPrice(ticketPriceData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, ticketPriceData);
    }
}