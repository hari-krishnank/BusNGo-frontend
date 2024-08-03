import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class FleetTypeService {
    private apiUrl = `${environment.backendUrl}/fleet-types`;

    constructor(private http: HttpClient) { }

    getAllFleetTypes(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    createFleetType(fleetTypeData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, fleetTypeData);
    }
}