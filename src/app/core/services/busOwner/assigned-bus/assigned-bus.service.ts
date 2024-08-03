import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AssignedBusService {
    private apiUrl = `${environment.backendUrl}/assigned-buses`;

    constructor(private http: HttpClient) { }

    getAllAssignedBuses(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    assignBusToTrip(tripId: string, busId: string): Observable<any> {
        return this.http.post(this.apiUrl, { trip: tripId, bus: busId });
    }
}