import { FormField } from '../../../core/models/user/form-fields.interface';
import { Validators } from '@angular/forms';

export const firstNameField: FormField[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter first name',
        validators: [Validators.required],
        errors: [{ type: 'required', message: 'First name is required' }]
    },
];

export const lastNameField: FormField[] = [
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Enter last name',
        validators: [Validators.required],
        errors: [{ type: 'required', message: 'Last name is required' }]
    },
];

export const ageField: FormField[] = [
    {
        name: 'age',
        label: 'Age',
        type: 'text',
        placeholder: 'Enter age',
        validators: [Validators.required, Validators.min(1)],
        errors: [
            { type: 'required', message: 'Age is required' },
            { type: 'min', message: 'Age must be greater than 0' }
        ]
    }
];

export const phoneField: FormField[] = [
    {
        name: 'mobileNumber',
        label: 'Mobile Number',
        type: 'tel',
        placeholder: 'Enter mobile number',
        validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        errors: [
            { type: 'required', message: 'Mobile number is required' },
            { type: 'pattern', message: 'Enter a valid 10-digit mobile number' }
        ]
    }
];

export const emailField: FormField[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email',
        validators: [Validators.required, Validators.email],
        errors: [
            { type: 'required', message: 'Email is required' },
            { type: 'email', message: 'Enter a valid email address' }
        ]
    }
];