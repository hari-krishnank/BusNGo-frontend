export const loginFields = [
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
            { type: 'minlength', message: 'Password must be at least 3 characters long.' }
        ]
    }
];
