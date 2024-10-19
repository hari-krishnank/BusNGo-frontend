import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class SearchTripService {
    private backendUrl = environment.backendUrl

    constructor(private http: HttpClient) { }

    searchTrips(searchData: any): Observable<any> {
        return this.http.post<any>(`${this.backendUrl}/search/trip`, searchData);
    }
}   