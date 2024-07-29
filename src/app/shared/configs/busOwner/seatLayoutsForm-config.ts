import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const seatLayoutmodalFields: ModalFormField[] = [
    {
        name: 'driverSeatPosition', placeholder: 'Select Driver Seat Position', type: 'select', errors: [], options: [
            { value: 'Right', label: 'Right' },
            { value: 'Left', label: 'Left' }
        ]
    },
    { name: 'rows', placeholder: 'Enter Rows', type: 'text', errors: [] },
    { name: 'columns', placeholder: 'Enter Columns', type: 'text', errors: [] },
    {
        name: 'upperDeck',
        placeholder: 'Seat Plan for Upper Deck',
        type: "toggle",
        errors: []
    }
];