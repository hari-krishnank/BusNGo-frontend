import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private backendUrl = environment.backendUrl

  constructor(private http: HttpClient) { }

  getCounters(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl)
  }

  addCounter(counterData: any): Observable<any[]> {
    return this.http.post<any[]>(this.backendUrl, counterData)
  }
}
