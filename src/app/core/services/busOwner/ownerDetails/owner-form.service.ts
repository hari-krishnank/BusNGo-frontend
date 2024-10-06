import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, passwordMatchValidator, phoneNumberValidator, strongPasswordValidator, usernameValidator } from '../../../../shared/validators/validators';

@Injectable({
    providedIn: 'root'
})
export class OwnerDetailsFormService {
    constructor(private fb: FormBuilder) { }

    createPersonalInfoForm(): FormGroup {
        return this.fb.group({
            firstName: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
            lastName: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
            email: [{ value: '', disabled: true }, Validators.required],
            mobile: ['', [Validators.required, phoneNumberValidator()]],
            password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]],
            confirmPassword: ['', [Validators.required, noWhitespaceValidator()]]
        }, { validator: passwordMatchValidator('password', 'confirmPassword') });
    }

    createAgencyDetailsForm(): FormGroup {
        return this.fb.group({
            agencyName: ['', Validators.required],
            designation: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            postalCode: ['', Validators.required],
            address: ['', Validators.required]
        });
    }

    populateFormsWithExistingData(personalInfoForm: FormGroup, agencyDetailsForm: FormGroup, ownerDetails: any): void {
        if (ownerDetails) {
            personalInfoForm.patchValue({
                firstName: ownerDetails.firstName,
                lastName: ownerDetails.lastName,
                email: ownerDetails.email,
                mobile: ownerDetails.mobile,
            });

            agencyDetailsForm.patchValue({
                agencyName: ownerDetails.agencyName,
                designation: ownerDetails.designation,
                country: ownerDetails.country,
                state: ownerDetails.state,
                city: ownerDetails.city,
                postalCode: ownerDetails.postalCode,
                address: ownerDetails.address
            });
        }
    }
}