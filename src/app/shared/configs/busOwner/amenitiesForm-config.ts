import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const amenitiesModalFields: ModalFormField[] = [
    { name: 'title', placeholder: 'Enter Title', type: 'text', errors: [] },
    {
        name: 'icon', placeholder: 'Select Icon', type: 'select', errors: [], options: [
            { value: 'icon1', label: 'Icon 1' },
            { value: 'icon2', label: 'Icon 2' }
        ]
    },
];