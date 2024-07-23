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

export interface ModalFormField {
    name: string;
    placeholder: string;
    type: string;
    errors: { type: string; message: string }[];
    options?: { value: string; label: string }[];
  }

export type FormValue = IRegistrationFormValue | ILoginFormValue ;