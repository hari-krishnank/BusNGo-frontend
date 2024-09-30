import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const staffModalFields: ModalFormField[] = [
    {
        name: 'username',
        placeholder: 'Enter the User name',
        type: 'text',
        errors: [
            { type: 'required', message: 'username is required' },
        ]
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        errors: [
            { type: 'required', message: 'Email is required.' }
        ]
    },
    {
        name: 'mobile',
        label: 'Mobile number',
        type: 'text',
        placeholder: 'Enter the Mobile number',
        errors: [
            { type: 'required', message: 'Mobile number is required.' }
        ]
    },
    {
        name: 'bus',
        label: 'Bus',
        type: 'select',
        placeholder: 'Select the bus',
        options: [],
        errors: [
            { type: 'required', message: 'Bus is required.' }
        ]
    },
]