import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CountersResponse, ICounter } from '../../../models/busOwner/counter.interface';

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

  getCounters(page: number = 1, limit: number = 5): Observable<CountersResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<CountersResponse>(this.backendUrl, {
      headers: this.getHeaders(),
      params: params
    });
  }

  getAllCounters(): Observable<ICounter[]> {
    return this.getCounters(1, 1000).pipe(
      map(response => response.counters)
    );
  }

  addCounter(counterData: Omit<ICounter, '_id'>): Observable<ICounter> {
    console.log('Sending counter data:', counterData);
    return this.http.post<ICounter>(this.backendUrl, counterData, { headers: this.getHeaders() })
  }

  updateCounter(id: string, counterData: Partial<ICounter>): Observable<ICounter> {
    return this.http.put<ICounter>(`${this.backendUrl}/${id}`, counterData, { headers: this.getHeaders() });
  }

  deleteCounter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`, { headers: this.getHeaders() });
  }
}