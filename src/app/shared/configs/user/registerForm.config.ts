import { FormField } from "../../../core/models/user/form-fields.interface";

export const registrationFields: FormField[] = [
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
        errors: [
            { type: 'required', message: 'Username is required.' },
            { type: 'whitespace', message: 'Username cannot consist only of spaces.' },
            { type: 'minlength', message: 'Username must be at least 4 characters long.' },
            { type: 'onlyLetters', message: 'Username should contain only letters (no numbers).' }
        ]
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        errors: [
            { type: 'required', message: 'Email is required.' },
            { type: 'email', message: 'Please enter a valid email address.' },
            { type: 'alreadyRegistered', message: 'This email is already registered.' }
        ]
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Enter your phone number',
        errors: [
            { type: 'required', message: 'Phone number is required.' },
            { type: 'invalidLength', message: 'Phone number must be exactly 10 digits long.' },
            { type: 'invalidCharacters', message: 'Phone number should only contain digits.' }
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