import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class SeatLayoutService {
    private backendUrl = `${environment.backendUrl}/seat-layouts`;

    constructor(private http: HttpClient) { }

    createSeatLayout(seatLayout: any): Observable<any> {
        console.log('Sending to backend:', seatLayout);
        return this.http.post(this.backendUrl, seatLayout);
    }

    getAllSeatLayouts(): Observable<any[]> {
        return this.http.get<any[]>(this.backendUrl);
    }

    updateSeatLayout(id: string, seatLayout: any): Observable<any> {
        return this.http.put(`${this.backendUrl}/${id}`, seatLayout);
    }

    deleteSeatLayout(id: string): Observable<any> {
        return this.http.delete(`${this.backendUrl}/${id}`);
    }
}