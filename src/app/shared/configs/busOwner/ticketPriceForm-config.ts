import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const ticketPriceModalFields: ModalFormField[] = [
    { name: 'fleetType', placeholder: 'Select Fleet Type', type: 'select', errors: [], options: [] },
    { name: 'route', placeholder: 'Select Route', type: 'select', errors: [], options:[] },
    { name: 'price', placeholder: 'Enter Price', type: 'text', errors: [] },
];