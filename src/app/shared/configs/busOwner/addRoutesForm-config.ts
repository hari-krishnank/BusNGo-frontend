import { ModalFormField } from "../../../core/models/user/form-fields.interface";

export const addRouteModalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Route Name', type: 'text', errors: [] },
    { name: 'startingPoint', placeholder: 'Select the Starting Point', type: 'select', errors: [], options: [] },
    { name: 'endingPoint', placeholder: 'Select the Ending Point', type: 'select', errors: [], options: [] },
    { name: 'hasMoreStoppage', placeholder: 'Has more Stoppage', type: 'checkbox', errors: [] },
    {
        name: 'additionalStops',
        placeholder: 'Select the Additional Stop',
        type: 'select',
        errors: [],
        options: [],
        conditionalDisplay: 'hasMoreStoppage' 
    },
    { name: 'distance', placeholder: 'Enter the distance', type: 'text', errors: [] },
    { name: 'time', placeholder: 'Enter the Time', type: 'text', errors: [] },
    {
        name: 'status', placeholder: 'Select Status', type: 'select', errors: [], options: [
            { value: 'Active', label: 'Active' },
            { value: 'Inactive', label: 'Inactive' }
        ]
    }
];