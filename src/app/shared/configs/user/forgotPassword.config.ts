import { FormField } from "../../../core/models/user/form-fields.interface";

export const forgotPasswordField: FormField[] = [
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