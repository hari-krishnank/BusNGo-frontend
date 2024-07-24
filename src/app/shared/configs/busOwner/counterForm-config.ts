import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const counterModalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Counter Name', type: 'text', errors: [] },
    { name: 'city', placeholder: 'Enter City Name', type: 'text', errors: [] },
    { name: 'location', placeholder: 'Enter City Location', type: 'text', errors: [] },
    { name: 'mobileNumber', placeholder: 'Enter Counter Contact Number', type: 'text', errors: [] },
];