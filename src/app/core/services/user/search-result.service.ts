import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchResultsService {
    private searchResultsSubject = new BehaviorSubject<any[]>([]);
    private selectedDateSubject = new BehaviorSubject<string>('');
    private searchDataSubject = new BehaviorSubject<any>(null);

    searchResults$ = this.searchResultsSubject.asObservable();
    selectedDate$ = this.selectedDateSubject.asObservable();
    searchData$ = this.searchDataSubject.asObservable();

    updateSearchResults(results: any[] | null, date: string, searchData: any) {
        this.searchResultsSubject.next(results || []);
        this.selectedDateSubject.next(date || '');
        this.searchDataSubject.next(searchData || null);
    }
}