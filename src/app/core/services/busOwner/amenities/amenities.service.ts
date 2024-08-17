import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  getAllAmenities(): Observable<IAmenity[]> {
    return this.getAmenities(1, 1000).pipe(
      map(response => response.amenities)
    );
  }

  getAmenities(page: number = 1, limit: number = 5): Observable<{ amenities: IAmenity[], total: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ amenities: IAmenity[], total: number }>(this.backendUrl, {
      headers: this.getHeaders(),
      params: params
    });
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