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

    // createPaymentIntent(amount: number): Observable<any> {
    //     console.log(amount);
    //     return this.http.post<any>(`${this.apiUrl}/create-payment-intent`, { amount });
    // }

    createCheckoutSession(amount: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create-checkout-session`, { amount });
    }
}