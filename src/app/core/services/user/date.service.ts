import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    formatDate(date: string | Date): string {
        if (date instanceof Date) {
            return date.toISOString().split('T')[0];
        } else if (typeof date === 'string') {
            return new Date(date).toISOString().split('T')[0];
        } else {
            console.error('Invalid date format:', date);
            return '';
        }
    }
}