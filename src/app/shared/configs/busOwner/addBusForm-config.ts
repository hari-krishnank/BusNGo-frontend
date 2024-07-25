import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const addBusmodalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Nick Name', type: 'text', errors: [] },
    {
        name: 'FleetType', placeholder: 'Select Fleet Type', type: 'select', errors: [], options: [
            { value: 'AC', label: 'AC' },
            { value: 'Non-AC', label: 'Non-AC' }
        ]
    },
    { name: 'regNo', placeholder: 'Enter Reg No', type: 'text', errors: [] },
    { name: 'engineNo', placeholder: 'Enter Engine No.', type: 'text', errors: [] },
    { name: 'chasisNo', placeholder: 'Enter Chasis No.', type: 'text', errors: [] },
    { name: 'ModelNo', placeholder: 'Enter Model No.', type: 'text', errors: [] },
];