import { Injectable } from '@angular/core';
import { ICounter } from '../../../models/busOwner/counter.interface';

@Injectable({
    providedIn: 'root'
})
export class CounterSearchService {
    searchCounters(countersData: ICounter[], searchTerm: string): ICounter[] {
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