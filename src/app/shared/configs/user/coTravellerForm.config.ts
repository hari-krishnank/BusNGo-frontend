import { FormField } from "../../../core/models/user/form-fields.interface";

export const coTravellerFirstNameField: FormField[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'First Name',
        errors: [
            { type: 'required', message: 'First name is required.' },
            { type: 'whitespace', message: 'First name cannot be blank.' },
            { type: 'minlength', message: 'Must be at least 2 characters.' },
            { type: 'onlyLetters', message: 'Use only letters.' }
        ]
    },
]

export const coTravellerLastNameField: FormField[] =[
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Last Name',
        errors: [
            { type: 'required', message: 'Last name is required.' },
            { type: 'whitespace', message: 'Last name cannot be blank.' },
            { type: 'minlength', message: 'Must be at least 2 characters.' },
            { type: 'onlyLetters', message: 'Use only letters.' }
        ]
    }
]
export const coTravellerAgeField: FormField[] =[
    {
        name: 'age',
        label: 'Age',
        type: 'text',
        placeholder: 'Age',
        errors: [
            { type: 'required', message: 'Age is required.' }
        ]
    }
]

export const coTravellerEmailField: FormField[] = [
    {
        name: 'emailAddress',
        label: 'Email Address',
        type: 'email',
        placeholder: 'Email Address',
        errors: [
            { type: 'required', message: 'Email address is required.' },
            { type: 'email', message: 'Invalid email address.' }
        ]
    }
]

export const coTravellerMobileField: FormField[] = [
    {
        name: 'mobileNo',
        label: 'Mobile Number',
        type: 'tel',
        placeholder: 'Mobile Number',
        errors: [
            { type: 'pattern', message: 'Invalid mobile number.' }
        ]
    }
]

export const coTravellerAddressField: FormField[] = [
    {
        name: 'streetAddress',
        label: 'Street Address',
        type: 'text',
        placeholder: 'Street Address',
        errors: []
    }
]

export const coTravellerCityField: FormField[] = [
    {
        name: 'city',
        label: 'City',
        type: 'text',
        placeholder: 'City',
        errors: []
    }
]

export const coTravellerStateField: FormField[] = [
    {
        name: 'state',
        label: 'State',
        type: 'text',
        placeholder: 'State',
        errors: []
    }
]

export const coTravellerPinCodeField: FormField[] = [
    {
        name: 'pinZipCode',
        label: 'PIN/ZIP Code',
        type: 'text',
        placeholder: 'PIN/ZIP Code',
        errors: []
    }
]

export const coTravellerContryField: FormField[] = [
    {
        name: 'country',
        label: 'Country',
        type: 'text',
        placeholder: 'Country',
        errors: []
    }
]