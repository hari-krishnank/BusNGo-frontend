import { FormField } from "../../../core/models/user/form-fields.interface";

export const ownerRegisterFields: FormField[] = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        errors: [
            { type: 'required', message: 'Email is required.' },
            { type: 'email', message: 'Enter a valid email.' }
        ]
    }
]

export const ownerFirstNameField: FormField[] = [
    {
        name: "firstName",
        label: "First Name",
        type: "text",
        placeholder: 'Enter your First Name',
        errors: [
            { type: 'required', message: 'Username is required.' },
            { type: 'whitespace', message: 'Username cannot be blank.' },
            { type: 'minlength', message: 'Must be at least 4 characters.' },
            { type: 'onlyLetters', message: 'Use only letters.' }
        ]
    }
]

export const ownerLastNameField: FormField[] = [
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: 'Enter your Last Name',
        errors: [
            { type: 'required', message: 'Username is required.' },
            { type: 'whitespace', message: 'Username cannot be blank.' },
            { type: 'minlength', message: 'Must be at least 4 characters.' },
            { type: 'onlyLetters', message: 'Use only letters.' }
        ]
    }
]

export const ownerEmailField: FormField[] = [
    {
        name: "email",
        label: "Email",
        type: "text",
        placeholder: 'Enter your Email',
        errors: []
    }
]

export const ownerMobileField: FormField[] = [
    {
        name: "mobile",
        label: "Mobile",
        type: "text",
        placeholder: 'Enter your Mobile Number',
        errors: [
            { type: 'required', message: 'Phone number is required.' },
            { type: 'invalidLength', message: 'Must be exactly 10 digits.' },
            { type: 'invalidCharacters', message: 'Use only digits.' }
        ]
    }
]

export const ownerPasswordField: FormField[] = [
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: 'Enter your Password',
        errors: [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Must be at least 8 characters.' },
            { type: 'strongPassword', message: 'Use uppercase, lowercase, number, and symbol.' }
        ]
    }
]

export const ownerConfirmPasswordField: FormField[] = [
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: 'Enter your Confirm Password',
        errors: [
            { type: 'required', message: 'Confirm password is required.' },
            { type: 'passwordMismatch', message: 'Passwords do not match.' }
        ]
    }
]