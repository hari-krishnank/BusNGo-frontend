import { FormField } from "../../../core/models/user/form-fields.interface";

export const loginFields: FormField[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        errors: [
            { type: 'required', message: 'Email is required.' },
            { type: 'email', message: 'Please enter a valid email address.' }
        ]
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        errors: [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Password must be at least 8 characters long.' },
            { type: 'strongPassword', message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' }
        ]
    },
];
