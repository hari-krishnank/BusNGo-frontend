import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(pass: FormGroup) {
    const password = pass.get('password')?.value;
    const confirmPassword = pass.get('confirmpassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
}

export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
}