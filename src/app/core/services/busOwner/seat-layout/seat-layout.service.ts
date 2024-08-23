import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ISeatLayout, SeatLayoutFormData } from '../../../models/busOwner/seatLayout.interface';

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

    createSeatLayout(seatLayout: SeatLayoutFormData): Observable<ISeatLayout> {
        console.log('Sending to backend:', seatLayout);
        return this.http.post<ISeatLayout>(this.backendUrl, seatLayout, { headers: this.getHeaders() });
    }

    getSeatLayouts(page: number = 1, limit: number = 5): Observable<{ seatLayouts: ISeatLayout[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        return this.http.get<{ seatLayouts: ISeatLayout[], total: number }>(this.backendUrl, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getAllSeatLayouts(): Observable<ISeatLayout[]> {
        return this.getSeatLayouts(1, 1000).pipe(
            map(response => response.seatLayouts)
        );
    }

    // getAllSeatLayouts(): Observable<ISeatLayout[]> {
    //     return this.http.get<ISeatLayout[]>(this.backendUrl, { headers: this.getHeaders() });
    // }

    updateSeatLayout(id: string, seatLayout: SeatLayoutFormData): Observable<ISeatLayout> {
        return this.http.put<ISeatLayout>(`${this.backendUrl}/${id}`, seatLayout, { headers: this.getHeaders() });
    }

    deleteSeatLayout(id: string): Observable<void> {
        return this.http.delete<void>(`${this.backendUrl}/${id}`, { headers: this.getHeaders() });
    }
}