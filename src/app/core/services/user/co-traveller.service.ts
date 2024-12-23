import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class CoTravellerService {
    private apiUrl = `${environment.backendUrl}/co-travellers`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('userToken');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    createCoTraveller(coTraveller: any): Observable<any> {
        return this.http.post(this.apiUrl, coTraveller, { headers: this.getHeaders() });
    }

    // getAllCoTravellers(): Observable<any[]> {
    //     return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    // }

    getAllCoTravellers(page: number, limit: number): Observable<{ coTravellers: any[], total: number }> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());
        return this.http.get<{ coTravellers: any[], total: number }>(this.apiUrl, { headers: this.getHeaders(), params });
    }


    getCoTravellerById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    updateCoTraveller(id: string, coTraveller: Partial<any>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, coTraveller, { headers: this.getHeaders() });
    }

    deleteCoTraveller(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }
}