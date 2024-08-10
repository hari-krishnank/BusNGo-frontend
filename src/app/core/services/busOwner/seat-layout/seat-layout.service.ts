import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class SeatLayoutService {
    private backendUrl = `${environment.backendUrl}/seat-layouts`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    createSeatLayout(seatLayout: any): Observable<any> {
        console.log('Sending to backend:', seatLayout);
        return this.http.post(this.backendUrl, seatLayout, { headers: this.getHeaders() });
    }

    getAllSeatLayouts(): Observable<any[]> {
        return this.http.get<any[]>(this.backendUrl, { headers: this.getHeaders() });
    }

    updateSeatLayout(id: string, seatLayout: any): Observable<any> {
        return this.http.put(`${this.backendUrl}/${id}`, seatLayout, { headers: this.getHeaders() });
    }

    deleteSeatLayout(id: string): Observable<any> {
        return this.http.delete(`${this.backendUrl}/${id}`, { headers: this.getHeaders() });
    }
}