import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class WalletService {
    private apiUrl = `${environment.backendUrl}`

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('userToken');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getWalletBalance(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/wallet/balance`, { headers: this.getHeaders() });
    }

    getTransactions(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/wallet/transactions`, { headers: this.getHeaders() });
    }

    createTopUpSession(amount: number): Observable<string> {
        return this.http.post<{ id: string }>(`${this.apiUrl}/wallet/top-up`, { amount }, { headers: this.getHeaders() }).pipe(map(response => response.id));
    }

    verifyTopUpSession(sessionId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/wallet/verify-session/${sessionId}`, { headers: this.getHeaders() });
    }
}