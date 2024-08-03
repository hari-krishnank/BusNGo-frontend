import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CounterSearchService {
    searchCounters(countersData: any[], searchTerm: string): any[] {
        if (!searchTerm.trim()) {
            return countersData;
        }
        const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
        return countersData.filter(counter =>
            Object.values(counter).some(value =>
                String(value).toLowerCase().includes(lowercaseSearchTerm)
            )
        );
    }
}