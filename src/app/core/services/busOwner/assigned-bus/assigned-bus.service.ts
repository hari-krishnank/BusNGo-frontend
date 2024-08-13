import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AssignedBusService {
    private apiUrl = `${environment.backendUrl}/assigned-buses`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getAllAssignedBuses(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
            .pipe(
                map(assignments => assignments.map(assignment => ({
                    ...assignment,
                    tripName: assignment.trip.title,
                    busName: assignment.bus.name,
                    regNo: assignment.bus.regNo
                })))
            );
    }

    assignBusToTrip(tripId: string, busId: string): Observable<any> {
        return this.http.post(this.apiUrl, { trip: tripId, bus: busId }, { headers: this.getHeaders() });
    }
}