import { Validators } from "@angular/forms";
import { FormField } from "../../../core/models/user/form-fields.interface";

export const From: FormField[] = [
    {
        name: 'from',
        label: 'From',
        type: 'autocomplete',
        placeholder: 'From',
        validators: [Validators.required],
        errors: [{ type: 'required', message: 'From location is required' }]
    }
];