import { ILoginFormValue } from "./login.interface";
import { IRegistrationFormValue } from "./register.interface";

export interface FormFieldError {
    type: string;
    message: string;
}

export interface FormField {
    name: string;
    label?: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'iconSelect' | 'toggle' | 'checkbox' | 'autocomplete' | 'select' | 'date';
    placeholder?: string;
    errors: FormFieldError[];
    validators?: any[];
    options?: { value: string; label: string, iconClass?: string }[];
    conditionalDisplay?: string
}

export interface ModalFormField {
    name: string;
    placeholder: string;
    type: string;
    label?: string;
    errors: FormFieldError[]
    options?: { value: string; label: string, iconClass?: string }[];
    conditionalDisplay?: string
    arrayFields ?: ModalFormField[]
}

export type FormValue = IRegistrationFormValue | ILoginFormValue;