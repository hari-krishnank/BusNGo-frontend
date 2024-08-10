import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private backendUrl = `${environment.backendUrl}/counters`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('ownerToken');
    console.log('token available aan: ', token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCounters(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl, { headers: this.getHeaders() })
  }

  addCounter(counterData: any): Observable<any[]> {
    console.log('Sending counter data:', counterData);
    return this.http.post<any[]>(this.backendUrl, counterData, { headers: this.getHeaders() })
  }

  updateCounter(id: string, counterData: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/${id}`, counterData, { headers: this.getHeaders() });
  }

  deleteCounter(id: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/${id}`, { headers: this.getHeaders() });
  }
}