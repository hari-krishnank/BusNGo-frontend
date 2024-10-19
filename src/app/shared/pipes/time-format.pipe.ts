import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat',
    standalone: true
})
export class TimeFormatPipe implements PipeTransform {
    transform(value: number): string {
        if (isNaN(value) || value < 0) {
            return 'Invalid time';
        }

        const hours = Math.floor(value);
        const minutes = Math.round((value - hours) * 60);

        if (hours === 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        } else if (minutes === 0) {
            return `${hours} hour${hours !== 1 ? 's' : ''}`;
        } else {
            return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
    }
}