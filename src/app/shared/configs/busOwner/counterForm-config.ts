import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const counterModalFields: ModalFormField[] = [
    {
        name: 'location',
        placeholder: 'Enter City Location',
        type: 'autocomplete',
        errors: [
            { type: 'required', message: 'Location is required' },
            { type: 'minlength', message: 'Location must be at least 3 characters long' },
            { type: 'whitespace', message: 'Location cannot be empty or just whitespace' }
        ]
    },
    {
        name: 'name',
        placeholder: 'Enter Bus Station Name',
        type: 'text',
        errors: [
            { type: 'required', message: 'Bus Station Name is required' },
            { type: 'minlength', message: 'Bus Station Name must be at least 3 characters long' },
            { type: 'whitespace', message: 'Bus Station Name cannot be empty or just whitespace' }
        ]
    },
    {
        name: 'city',
        placeholder: 'Enter City Name',
        type: 'text',
        errors: [
            { type: 'required', message: 'City Name is required' },
            { type: 'whitespace', message: 'City Name cannot be empty or just whitespace' },
            { type: 'minlength', message: 'Bus Station Name must be at least 3 characters long' }
        ]
    },
    {
        name: 'mobileNumber',
        placeholder: 'Enter Counter Contact Number',
        type: 'text',
        errors: [
            { type: 'required', message: 'Contact Number is required' },
            { type: 'invalidLength', message: 'Contact Number must be 10 digits long' },
            { type: 'invalidCharacters', message: 'Contact Number must contain only numbers' }
        ]
    },
    {
        name: 'status', placeholder: 'Select Status', type: 'select', errors: [], options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
        ]
    }
];