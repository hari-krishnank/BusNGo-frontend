import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface UserProfile {
  username: string;
  email: string;
  lastName: string;
  phone: string;
  profileImage: string;
  is_googleUser: boolean;
  dob?: string;
  gender?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private backendURL = environment.backendUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    console.log('token available aan: ', token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.backendURL}/user-profile`, { headers: this.getHeaders() });
  }

  updateUserProfile(profile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.backendURL}/user-profile`, profile, { headers: this.getHeaders() });
  }

  uploadProfilePhoto(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    console.log('File name:', file.name);
    console.log('File type:', file.type);
    console.log('File size:', file.size, 'bytes');

    console.log('FormData has image:', formData.has('image'));

    return this.http.post<{ url: string }>(
      `${this.backendURL}/user-profile/update-photo`,
      formData,
      { headers: this.getHeaders() }
    );
  }
}