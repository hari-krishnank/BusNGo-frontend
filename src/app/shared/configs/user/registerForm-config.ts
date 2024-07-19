export const registrationFields = [
    {
        name: 'username',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your Name',
        errors: [
            { type: 'required', message: 'Name is required.' },
            { type: 'whitespace', message: 'Name cannot consist only of spaces.' }
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
            { type: 'phoneNumber', message: 'Please enter a valid 10-digit phone number.' }
        ]
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        errors: [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Password must be at least 3 characters long.' }
        ]
    },
    {
        name: 'confirmpassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Enter confirm password',
        errors: [
            { type: 'required', message: 'Confirm password is required.' },
            { type: 'mismatch', message: 'Passwords do not match.' }
        ]
    }
];