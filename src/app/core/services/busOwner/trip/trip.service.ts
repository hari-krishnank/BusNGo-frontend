import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    private apiUrl = `${environment.backendUrl}/trips`;
 
    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getAllTrips(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    getFleetTypes(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.backendUrl}/fleet-types`, { headers: this.getHeaders() });
    }

    getRoutes(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.backendUrl}/routes`, { headers: this.getHeaders() });
    }

    getSchedules(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.backendUrl}/schedules`, { headers: this.getHeaders() });
    }

    getCounters(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.backendUrl}/counters`, { headers: this.getHeaders() });
    }

    createTrip(tripData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, tripData, { headers: this.getHeaders() });
    }
}