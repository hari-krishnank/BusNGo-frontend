import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { IFleetType } from '../../../models/busOwner/fleet-type.interface';

@Injectable({
    providedIn: 'root'
})
export class FleetTypeService {
    private apiUrl = `${environment.backendUrl}/fleet-types`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getAllFleetTypes(): Observable<IFleetType[]> {
        return this.http.get<IFleetType[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    createFleetType(fleetTypeData: Partial<IFleetType>): Observable<IFleetType> {
        return this.http.post<IFleetType>(this.apiUrl, fleetTypeData, { headers: this.getHeaders() });
    }
}