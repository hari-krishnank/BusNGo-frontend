import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
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


    getRoutes(page: number = 1, limit: number = 5): Observable<{ routes: any[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        return this.http.get<{ routes: any[], total: number }>(this.backendUrl, {
            headers: this.getHeaders(),
            params: params
        });
    }

    // getAllRoutes(): Observable<any[]> {
    //     return this.http.get<any[]>(this.backendUrl, { headers: this.getHeaders() })
    //         .pipe(
    //             tap(routes => console.log('getRoutes response:', JSON.stringify(routes, null, 2)))
    //         );
    // }

    getAllRoutes(): Observable<any[]> {
        return this.getRoutes(1, 1000).pipe(
            map(response => response.routes),
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