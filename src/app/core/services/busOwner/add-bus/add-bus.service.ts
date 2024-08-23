import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class BusService {
    private backendUrl = `${environment.backendUrl}/buses`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    addBus(busData: any): Observable<any> {
        return this.http.post(this.backendUrl, busData, { headers: this.getHeaders() });
    }

    getBuses(page: number = 1, limit: number = 5): Observable<{ buses: any[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        return this.http.get<{ buses: any[], total: number }>(this.backendUrl, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getAllBuses(): Observable<any[]> {
        return this.getBuses(1, 1000).pipe(
            map(respone => respone.buses)
        )
    }
}