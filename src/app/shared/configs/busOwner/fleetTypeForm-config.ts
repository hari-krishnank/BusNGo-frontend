import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const fleetTypeModalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Fleet Type Name', type: 'text', errors: [] },
    { name: 'facilities', placeholder: 'Select Facilities', type: 'multiselect', errors: [], options: [] },
    { name: 'seatLayout', placeholder: 'Select Seat Layout', type: 'select', errors: [], options: [] },
    {
        name: 'status', placeholder: 'Select Status', type: 'select', errors: [], options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
        ]
    },
    { name: 'acStatus', placeholder: 'AC Status', type: 'toggle', errors: [] }
]; 