import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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

  getCounters(page: number = 1, limit: number = 5): Observable<{ counters: any[], total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ counters: any[], total: number }>(this.backendUrl, {
      headers: this.getHeaders(),
      params: params
    });
  }

  getAllCounters(): Observable<any[]> {
    return this.getCounters(1, 1000).pipe(
      map(response => response.counters)
    );
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