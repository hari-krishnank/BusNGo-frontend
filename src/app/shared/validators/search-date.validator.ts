import { AbstractControl, ValidatorFn } from "@angular/forms";

export function dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate < currentDate) {
            return { 'invalidDate': true };
        }
        return null;
    }
}