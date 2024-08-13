import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const tripModalFields: ModalFormField[] = [
    { name: 'title', placeholder: 'Enter Title', type: 'text', errors: [] },
    { name: 'dayOff', placeholder: 'Select Day Off', type: 'multiselect', errors: [], options: [] },
    { name: 'ticketPrice', placeholder: 'Enter Ticket Price', type: 'text', errors: [], options: [] },
    { name: 'fleetType', placeholder: 'Select Fleet Type', type: 'select', errors: [], options: [] },
    { name: 'route', placeholder: 'Select Route', type: 'select', errors: [], options: [] },
    { name: 'schedule', placeholder: 'Select Schedule', type: 'select', errors: [], options: [] },
    { name: 'startFrom', placeholder: 'Select Start From', type: 'select', errors: [], options: [] },
    { name: 'endTo', placeholder: 'Select End To', type: 'select', errors: [], options: [] },
];
