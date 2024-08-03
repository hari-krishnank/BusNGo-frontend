import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private backendUrl = `${environment.backendUrl}/routes`

    constructor(private http: HttpClient) { }

    getRoutes(): Observable<any[]> {
        return this.http.get<any[]>(this.backendUrl);
    }

    addRoute(route: any): Observable<any> {
        return this.http.post<any>(this.backendUrl, route);
    }
}