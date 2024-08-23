import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { IFleetType } from '../../../models/busOwner/fleet-type.interface';

@Injectable({
    providedIn: 'root'
})
export class FleetTypeService {
    private backendUrl = `${environment.backendUrl}/fleet-types`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getFleetTypes(page: number = 1, limit: number = 5): Observable<{ fleetTypes: IFleetType[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        return this.http.get<{ fleetTypes: IFleetType[], total: number }>(this.backendUrl, {
            headers: this.getHeaders(),
            params: params
        });
    }

    getAllFleetTypes(): Observable<IFleetType[]> {
        return this.getFleetTypes(1, 1000).pipe(
            map(response => response.fleetTypes)
        )
    }

    // getAllFleetTypes(): Observable<IFleetType[]> {
    //     return this.http.get<IFleetType[]>(this.backendUrl, { headers: this.getHeaders() });
    // }

    createFleetType(fleetTypeData: Partial<IFleetType>): Observable<IFleetType> {
        return this.http.post<IFleetType>(this.backendUrl, fleetTypeData, { headers: this.getHeaders() });
    }
}