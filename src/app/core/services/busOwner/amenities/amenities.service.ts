import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { IAmenity, ICreateAmenityDto, IUpdateAmenityDto } from '../../../models/busOwner/amenity.interface';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {
  private backendUrl = `${environment.backendUrl}/amenities`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('ownerToken');
    console.log(token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // getAmenities(): Observable<IAmenity[]> {
  //   return this.http.get<IAmenity[]>(this.backendUrl);
  // }

  // getAmenities(): Observable<IAmenity[]> {
  //   return this.http.get<IAmenity[]>(this.backendUrl, { headers: this.getHeaders() });
  // }

  // getAmenity(id: string): Observable<IAmenity> {
  //   return this.http.get<IAmenity>(`${this.backendUrl}/${id}`);
  // }

  // getAllAmenities(): Observable<IAmenity[]> {
  //   return this.http.get<IAmenity[]>(this.backendUrl);
  // }

  // createAmenity(amenity: ICreateAmenityDto): Observable<IAmenity> {
  //   return this.http.post<IAmenity>(this.backendUrl, amenity);
  // }

  // updateAmenity(id: string, amenity: IUpdateAmenityDto): Observable<IAmenity> {
  //   return this.http.patch<IAmenity>(`${this.backendUrl}/${id}`, amenity);
  // }

  // deleteAmenity(id: string): Observable<IAmenity> {
  //   return this.http.delete<IAmenity>(`${this.backendUrl}/${id}`);
  // }

  getAmenities(): Observable<IAmenity[]> {
    return this.http.get<IAmenity[]>(this.backendUrl, { headers: this.getHeaders() });
  }

  getAmenity(id: string): Observable<IAmenity> {
    return this.http.get<IAmenity>(`${this.backendUrl}/${id}`, { headers: this.getHeaders() });
  }

  createAmenity(amenity: ICreateAmenityDto): Observable<IAmenity> {
    return this.http.post<IAmenity>(this.backendUrl, amenity, { headers: this.getHeaders() });
  }

  updateAmenity(id: string, amenity: IUpdateAmenityDto): Observable<IAmenity> {
    return this.http.patch<IAmenity>(`${this.backendUrl}/${id}`, amenity, { headers: this.getHeaders() });
  }

  deleteAmenity(id: string): Observable<IAmenity> {
    return this.http.delete<IAmenity>(`${this.backendUrl}/${id}`, { headers: this.getHeaders() });
  }
}
