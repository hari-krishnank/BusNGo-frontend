import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormField } from '../../models/user/form-fields.interface';
import { From } from '../../../shared/configs/user/busSearchForm.config';
import { dateValidator } from '../../../shared/validators/search-date.validator';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    constructor(private fb: FormBuilder) { }

    getFromFields(): FormField[] {
        return From;
    }

    getToFields(): FormField[] {
        return [
            {
                name: 'to',
                label: 'From',
                type: 'autocomplete',
                placeholder: 'To',
                validators: [Validators.required],
                errors: [{ type: 'required', message: 'To location is required' }]
            },
        ];
    }

    getDateFields(): FormField[] {
        return [
            {
                name: 'dateField',
                type: 'date',
                placeholder: 'Date',
                validators: [Validators.required],
                errors: [
                    { type: 'required', message: 'Date is required' },
                    { type: 'invalidDate', message: 'Please select a current or future date' }
                ],
                config: {
                    min: new Date()
                }
            }
        ];
    }

    createSearchForm(): FormGroup {
        return this.fb.group({
            from: ['', Validators.required],
            to: ['', Validators.required],
            dateField: ['', [Validators.required, dateValidator()]]
        });
    }

    setupDebouncing(form: FormGroup, destroy$: Subject<void>) {
        ['from', 'to'].forEach(field => {
            form.get(field)!.valueChanges.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntil(destroy$)
            ).subscribe(value => {
                console.log(`Debounced ${field} value:`, value);
            });
        });
    }

    getSearchData(form: FormGroup): any {
        return {
            from: form.get('from')?.value,
            to: form.get('to')?.value,
            date: this.formatDate(form.get('dateField')?.value)
        };
    }

    storeSearchData(searchData: any, results: any) {
        const searchDataToStore = { ...searchData, results };
        localStorage.setItem('searchData', JSON.stringify(searchDataToStore));
    }

    // private formatDate(date: string | Date): string {
    //     if (date instanceof Date) {
    //         return date.toISOString().split('T')[0];
    //     } else if (typeof date === 'string') {
    //         return new Date(date).toISOString().split('T')[0];
    //     } else {
    //         console.error('Invalid date format:', date);
    //         return '';
    //     }
    // }
    private formatDate(date: string | Date): string {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
}
