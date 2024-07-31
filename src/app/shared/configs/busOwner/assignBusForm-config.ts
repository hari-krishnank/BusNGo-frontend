import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const assignedBusModalFields: ModalFormField[] = [
    { name: 'trip', placeholder: 'Select Trip', type: 'select', errors: [], options: [] },
    { name: 'bus', placeholder: 'Select Bus', type: 'select', errors: [], options: [] }
];