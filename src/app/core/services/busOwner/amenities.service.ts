import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {
  private backendUrl = `${environment.backendUrl}/amenities`;

  constructor(private http: HttpClient) { }

  getAmenities(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl);
  }

  getAmenity(id: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/${id}`);
  }

  getAllAmenities(): Observable<any[]> {
    return this.http.get<any[]>(this.backendUrl);
  }

  createAmenity(amenity: any): Observable<any> {
    return this.http.post<any>(this.backendUrl, amenity);
  }

  updateAmenity(id: string, amenity: any): Observable<any> {
    return this.http.patch<any>(`${this.backendUrl}/${id}`, amenity);
  }

  deleteAmenity(id: string): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/${id}`);
  }
}
