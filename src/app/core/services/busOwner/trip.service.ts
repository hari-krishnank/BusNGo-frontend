import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    private apiUrl = `${environment.backendUrl}/trips`;

    constructor(private http: HttpClient) { }

    getAllTrips(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getFleetTypes(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.backendUrl}/fleet-types`);
    }

    getRoutes(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.backendUrl}/routes`);
    }

    getSchedules(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.backendUrl}/schedules`);
    }

    getCounters(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.backendUrl}/counters`);
    }

    createTrip(tripData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, tripData);
    }
}