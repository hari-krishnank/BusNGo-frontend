import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {
    private apiUrl = `${environment.backendUrl}/schedules`; 

    constructor(private http: HttpClient) { }

    getSchedules(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getSchedule(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    createSchedule(schedule: Omit<any, 'id'>): Observable<any> {
        return this.http.post<any>(this.apiUrl, schedule);
    }

    updateSchedule(id: string, schedule: Partial<any>): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, schedule);
    }

    deleteSchedule(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}