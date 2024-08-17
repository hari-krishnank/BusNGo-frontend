import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const seatLayoutmodalFields: ModalFormField[] = [
    { name: 'layoutName', placeholder: 'Enter Seat Layout Name', type: 'text', errors: [] },
    { name: 'rows', placeholder: 'Enter Rows', type: 'text', errors: [] },
    { name: 'columns', placeholder: 'Enter Columns', type: 'text', errors: [] },
    {
        name: 'status', placeholder: 'Select Status', type: 'select', errors: [], options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
        ]
    }
];