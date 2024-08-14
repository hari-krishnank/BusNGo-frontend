import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchResultsService {
    private searchResultsSubject = new BehaviorSubject<any[]>([]);
    searchResults$ = this.searchResultsSubject.asObservable();

    private selectedDateSubject = new BehaviorSubject<string>('');
    selectedDate$ = this.selectedDateSubject.asObservable();

    private searchDataSubject = new BehaviorSubject<any>(null);
    searchData$ = this.searchDataSubject.asObservable();

    updateSearchResults(results: any[], date: string, searchData: any) {
        this.searchResultsSubject.next(results);
        this.selectedDateSubject.next(date);
        this.searchDataSubject.next(searchData);
    }
}