import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class UpdateSearchService {
    private backendUrl = environment.backendUrl

    constructor(private http: HttpClient) { }

    updateSearch(searchData: any): Observable<any> {
        console.log(searchData);
        return this.http.post<any>(`${this.backendUrl}/search/trip`, searchData);
    }
} 