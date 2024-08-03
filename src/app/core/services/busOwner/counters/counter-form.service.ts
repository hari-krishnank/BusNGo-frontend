import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, phoneNumberValidator } from '../../../../shared/validators/validators';

@Injectable({
    providedIn: 'root'
})
export class CounterFormService {
    constructor(private formBuilder: FormBuilder) { }

    createCounterForm(counter?: any): FormGroup {
        return this.formBuilder.group({
            name: [counter ? counter.name : '', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]],
            city: [counter ? counter.city : '', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]],
            location: [counter ? counter.location : '', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]],
            mobileNumber: [counter ? counter.mobileNumber : '', [Validators.required, phoneNumberValidator()]],
            status: [counter ? counter.status : '', [Validators.required, noWhitespaceValidator()]]
        });
    }
}