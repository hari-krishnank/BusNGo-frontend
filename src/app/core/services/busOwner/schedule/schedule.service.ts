import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private apiUrl = `${environment.backendUrl}/schedules`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getSchedules(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    getSchedule(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    createSchedule(schedule: Omit<any, 'id'>): Observable<any> {
        return this.http.post<any>(this.apiUrl, schedule, { headers: this.getHeaders() });
    }

    updateSchedule(id: string, schedule: Partial<any>): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, schedule, { headers: this.getHeaders() });
    }

    deleteSchedule(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }
}