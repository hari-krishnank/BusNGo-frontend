import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class BusService {
    private backendUrl = `${environment.backendUrl}/buses`;

    constructor(private http: HttpClient) { }

    addBus(busData: any): Observable<any> {
        return this.http.post(this.backendUrl, busData);
    }

    getAllBuses(): Observable<any[]> {
        return this.http.get<any[]>(this.backendUrl).pipe(
            map(buses => buses.map(bus => ({
                ...bus,
                fleetTypeName: bus.FleetType.name 
            })))
        );
    }
}