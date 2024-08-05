import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IAmenity } from '../../../models/busOwner/amenity.interface';

@Injectable({
    providedIn: 'root'
})
export class AmenitiesSearchService {
    private searchTerms = new BehaviorSubject<string>('');

    constructor() { }

    setSearchTerm(term: string): void {
        console.log('Setting search term:', term);
        this.searchTerms.next(term);
    }

    searchAmenities(amenities: IAmenity[], term: string): IAmenity[] {
        console.log('Searching amenities with term:', term);
        if (!term.trim()) {
            return amenities;
        }
        term = term.toLowerCase();
        return amenities.filter(amenity =>
            amenity.title.toLowerCase().includes(term) ||
            amenity.icon.toLowerCase().includes(term)
        );
    }

    getSearchTerms(): Observable<string> {
        return this.searchTerms.asObservable().pipe(
            debounceTime(300),
            distinctUntilChanged()
        );
    }
}