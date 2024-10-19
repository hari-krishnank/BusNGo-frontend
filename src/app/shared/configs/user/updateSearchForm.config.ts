import { Validators } from "@angular/forms";
import { FormField } from "../../../core/models/user/form-fields.interface";

export const From: FormField[] = [
    {
        name: 'from',
        type: 'autocomplete',
        placeholder: 'From',
        validators: [Validators.required],
        errors: [{ type: 'required', message: 'From location is required' }]
    }
];

export const To: FormField[] = [
    {
        name: 'to',
        type: 'autocomplete',
        placeholder: 'To',
        validators: [Validators.required],
        errors: [{ type: 'required', message: 'To location is required' }]
    },
];

// export const Date: FormField[] = [
//     {
//         name: 'dateField',
//         type: 'date',
//         placeholder: 'Date',
//         validators: [Validators.required],
//         errors: [
//             { type: 'required', message: 'Date is required' },
//             { type: 'invalidDate', message: 'Please select a current or future date' }
//         ],
//         config: {
//             min: new Date() 
//         }
//     }
// ];

export const dateFieldConfig: FormField[] = [
    {
        name: 'dateField',
        type: 'date',
        placeholder: 'Date',
        validators: [Validators.required],
        errors: [
            { type: 'required', message: 'Date is required' },
            { type: 'invalidDate', message: 'Please select a current or future date' }
        ],
        config: {
            min: new Date() 
        }
    }
];
