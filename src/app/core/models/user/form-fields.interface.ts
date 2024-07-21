import { ILoginFormValue } from "./login";
import { IRegistrationFormValue } from "./register";

export interface FormFieldError {
    type: string;
    message: string;
}

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel';
    placeholder: string;
    errors: FormFieldError[];
    validators?: any[];
}

export type FormValue = IRegistrationFormValue | ILoginFormValue ;