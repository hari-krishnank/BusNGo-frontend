import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  context: Array<{ id: string, text: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class MapBoxService {
  constructor(private http: HttpClient) { }

  search_word(query: string): Observable<Feature[]> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get<MapboxOutput>(url + query + '.json?access_token=' + environment.mapbox.accessToken)
      .pipe(map((res: MapboxOutput) => {
        return res.features;
      }));
  }
}