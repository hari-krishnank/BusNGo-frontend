import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const scheduleModalFields: ModalFormField[] = [
    { name: 'startFrom', placeholder: 'Enter Start Time', type: 'text', errors: [] },
    { name: 'end', placeholder: 'Enter End Time', type: 'text', errors: [] },
    { name: 'duration', placeholder: 'Enter Duration', type: 'text', errors: [] },
    {
        name: 'status', placeholder: 'Select Status', type: 'select', errors: [], options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
        ]
    }
];
