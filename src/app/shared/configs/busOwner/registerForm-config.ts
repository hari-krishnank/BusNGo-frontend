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
        errors: []
    }
]

export const ownerLastNameField: FormField[] = [
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: 'Enter your Last Name',
        errors: []
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
        errors: []
    }
]

export const ownerPasswordField: FormField[] = [
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: 'Enter your Password',
        errors: []
    }
]

export const ownerConfirmPasswordField: FormField[] = [
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: 'Enter your Confirm Password',
        errors: []
    }
]