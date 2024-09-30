import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { ICreateStaff, IStaffs } from "../../../models/busOwner/staff.interface";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StaffService {
    private apiUrl = `${environment.backendUrl}/staff`

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('ownerToken');
        console.log('token available aan: ', token);
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    constructor(private http: HttpClient) { }

    // createStaff(createStaffDto: ICreateStaff): Observable<Omit<IStaffs, 'password'>> {
    //     return this.http.post<Omit<IStaffs, 'password'>>(this.apiUrl, createStaffDto, {headers: this.getHeaders()});
    // }

    createStaff(createStaffDto: ICreateStaff): Observable<Omit<IStaffs, 'password'>> {
        return this.http.post<Omit<IStaffs, 'password'>>(this.apiUrl, createStaffDto, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    getStaffs(): Observable<IStaffs[]> {
        return this.http.get<IStaffs[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            if (error.status === 409) {
                errorMessage = 'Email already in use';
            } else {
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
        }
        return throwError(errorMessage);
    }
}