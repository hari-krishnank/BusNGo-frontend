import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const fleetTypeModalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Name', type: 'text', errors: [] },
    { name: 'seatLayout', placeholder: 'Enter Seat Layout', type: 'text', errors: [] },
    { name: 'noDeck', placeholder: 'Enter No Deck', type: 'text', errors: [] },
    { name: 'totalSeats', placeholder: 'Enter Total Seats', type: 'text', errors: [] },
    { name: 'facilities', placeholder: 'Enter Facilities', type: 'text', errors: [] },
    {
        name: 'status', placeholder: 'Select Status', type: 'select', errors: [], options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
        ]
    }
];