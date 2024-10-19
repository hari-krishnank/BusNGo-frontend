import { ILoginFormValue } from "./login.interface";
import { IRegistrationFormValue } from "./register.interface";

export interface FormFieldError {
    type: string;
    message: string;
}

export interface FormField {
    name: string;
    label?: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'iconSelect' | 'toggle' | 'checkbox' | 'autocomplete' | 'select' | 'date' | 'radio' | 'textarea';
    placeholder?: string;
    errors: FormFieldError[];
    validators?: any[];
    showPassword?: boolean;
    conditionalDisplay?: string;
    value?: string;
    rows?: number;
    options?: { value: string; label: string, iconClass?: string }[];
    config?: {
        min?: Date;
        max?: Date;
        [key: string]: any;
    };
}

export interface ModalFormField {
    name: string;
    placeholder: string;
    type: string;
    label?: string;
    errors: FormFieldError[]
    options?: { value: string; label: string, iconClass?: string }[];
    conditionalDisplay?: string
    arrayFields?: ModalFormField[]
}

export type FormValue = IRegistrationFormValue | ILoginFormValue;