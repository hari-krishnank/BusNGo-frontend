import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private backendUrl = `${environment.backendUrl}/routes`

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getRoutes(): Observable<any[]> {
        return this.http.get<any[]>(this.backendUrl, { headers: this.getHeaders() })
            .pipe(
                tap(routes => console.log('getRoutes response:', JSON.stringify(routes, null, 2)))
            );
    }

    addRoute(route: any): Observable<any> {
        return this.http.post<any>(this.backendUrl, route, { headers: this.getHeaders() })
            .pipe(
                tap(newRoute => console.log('addRoute response:', JSON.stringify(newRoute, null, 2)))
            );
    }
}