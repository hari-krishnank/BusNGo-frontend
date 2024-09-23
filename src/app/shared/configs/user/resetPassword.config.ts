import { FormField } from "../../../core/models/user/form-fields.interface";

export const resetPasswordField: FormField[] = [
    {
        name: 'newPassword', 
        type: 'password', 
        label: 'New Password', 
        placeholder: 'Enter new password',
        errors: [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Must be at least 8 characters.' },
            { type: 'strongPassword', message: 'Use uppercase, lowercase, number, and symbol.' },
            { type: 'containsSpace', message: 'Password cannot contain spaces.' }
        ]
    },
    {
        name: 'confirmPassword', 
        type: 'password', 
        label: 'Confirm Password', 
        placeholder: 'Confirm new password',
        errors: [
            { type: 'required', message: 'Confirm password is required.' },
            { type: 'passwordMismatch', message: 'Passwords do not match.' },
            { type: 'containsSpace', message: 'Password cannot contain spaces.' }        
        ]
    }
]