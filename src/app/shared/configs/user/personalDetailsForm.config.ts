import { FormField } from "../../../core/models/user/form-fields.interface";

export const profileEmailField: FormField[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Email ID',
        errors: [
            { type: 'required', message: 'Email is required.' },
            { type: 'email', message: 'Enter a valid email.' }
        ]
    }
]

export const profileMobileNumberField: FormField[] = [
    {
        name: 'mobileNumber',
        label: 'Mobile Number',
        type: 'text',
        placeholder: 'Mobile Number',
        errors: [
            { type: 'required', message: 'Phone number is required.' },
            { type: 'invalidLength', message: 'Must be exactly 10 digits.' },
            { type: 'invalidCharacters', message: 'Use only digits.' }
        ]
    }
]

export const profileFirstNameField: FormField[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'First Name',
        errors: [
            { type: 'required', message: 'Username is required.' },
            { type: 'whitespace', message: 'Username cannot be blank.' },
            { type: 'minlength', message: 'Must be at least 4 characters.' },
            { type: 'onlyLetters', message: 'Use only letters.' }
        ]
    }
]

export const profileLastNameField: FormField[] = [
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Last Name',
        errors: [
            { type: 'required', message: 'Username is required.' },
            { type: 'whitespace', message: 'Username cannot be blank.' },
            { type: 'minlength', message: 'Must be at least 4 characters.' },
            { type: 'onlyLetters', message: 'Use only letters.' }
        ]
    }
]

export const profileDobField: FormField[] = [
    {
        name: 'dob',
        label: 'Date of Birth',
        type: 'date',
        placeholder: 'DD-MM-YYYY',
        errors: [
            { type: 'required', message: 'Date of Birth is required.' }
        ]
    }
];