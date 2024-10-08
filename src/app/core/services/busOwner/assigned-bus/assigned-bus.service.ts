import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    getAssignedBuses(page: number = 1, limit: number = 5): Observable<{ assignedBuses: any[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        return this.http.get<{ assignedBuses: any[], total: number }>(this.apiUrl, {
            headers: this.getHeaders(),
            params: params
        });
    }

    // getAllAssignedBuses(): Observable<any[]> {
    //     return this.getAssignedBuses(1,1000)
    //         .pipe(
    //             map(assignments => assignments.map(assignment => ({
    //                 ...assignment,
    //                 tripName: assignment.trip?.title || 'No Trip Assigned',
    //                 busName: assignment.bus?.name,
    //                 regNo: assignment.bus?.regNo
    //             }))) 
    //         );
    // }
    
    getAllAssignedBuses(): Observable<any[]> {
        return this.getAssignedBuses(1, 1000).pipe(
            map(response => response.assignedBuses.map(assignment => ({
                ...assignment,
                tripName: assignment.trip?.title || 'No Trip Assigned',
                busName: assignment.bus?.name,
                regNo: assignment.bus?.regNo
            })))
        );
    }

    assignBusToTrip(tripId: string, busId: string): Observable<any> {
        return this.http.post(this.apiUrl, { trip: tripId, bus: busId }, { headers: this.getHeaders() });
    }
}