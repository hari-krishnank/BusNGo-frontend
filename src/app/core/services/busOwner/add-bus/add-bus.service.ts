import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    getAllBuses(): Observable<any[]> {
        return this.http.get<any[]>(
            this.backendUrl, { headers: this.getHeaders() }).pipe(map(buses => buses.map(bus => ({ ...bus, fleetTypeName: bus.FleetType.name })))
            );
    }
}