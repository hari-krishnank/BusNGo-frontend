import { FormField } from "../../../core/models/user/form-fields.interface";

export const registrationFields: FormField[] = [
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
        errors: [
            { type: 'required', message: 'Username is required.' },
            { type: 'whitespace', message: 'Username cannot be blank.' },
            { type: 'minlength', message: 'Must be at least 4 characters.' },
            { type: 'onlyLetters', message: 'Use only letters.' }
        ]
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        errors: [
            { type: 'required', message: 'Email is required.' },
            { type: 'email', message: 'Enter a valid email.' },
            { type: 'alreadyRegistered', message: 'Email already registered.' }
        ]
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter your phone number',
        errors: [
            { type: 'required', message: 'Phone number is required.' },
            { type: 'invalidLength', message: 'Must be exactly 10 digits.' },
            { type: 'invalidCharacters', message: 'Use only digits.' }
        ]
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        errors: [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Must be at least 8 characters.' },
            { type: 'strongPassword', message: 'Use uppercase, lowercase, number, and symbol.' }
        ]
    },
    {
        name: 'confirmpassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Enter confirm password',
        errors: [
            { type: 'required', message: 'Confirm password is required.' },
            { type: 'passwordMismatch', message: 'Passwords do not match.' }
        ]
    }
];