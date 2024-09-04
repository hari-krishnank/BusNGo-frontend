import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StripeService {
    private apiUrl = `${environment.backendUrl}/payments`;

    constructor(private http: HttpClient) { }

    createCheckoutSession(bookingDetails: any): Observable<any> {
        console.log(bookingDetails);
        return this.http.post<any>(`${this.apiUrl}/create-checkout-session`, bookingDetails);
    }

    verifySession(sessionId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/verify-session/${sessionId}`);
    }
}