import { AbstractControl, ValidatorFn } from "@angular/forms";

export function usernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const username = control.value;
        if (username == null) {
            return null;
        }

        if (username.length < 4) {
            return { 'minlength': true };
        }
        if (!/^[a-zA-Z]+$/.test(username)) {
            return { 'onlyLetters': true };
        }
        return null;
    };
}

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (control && matchingControl && control.value !== matchingControl.value) {
            matchingControl.setErrors({ 'passwordMismatch': true });
            return { 'passwordMismatch': true };
        } else {
            return null;
        }
    };
}

export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

        if (control.value == null) {
            return null;
        }

        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
}

export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const phoneNumber = control.value;
        if (phoneNumber == null) {
            return { 'required': true };
        }

        const numericRegex = /^[0-9]+$/;
        if (!phoneNumber) {
            return { 'required': true };
        }
        if (phoneNumber.length !== 10) {
            return { 'invalidLength': true };
        }
        if (!numericRegex.test(phoneNumber)) {
            return { 'invalidCharacters': true };
        }
        return null;
    };
}

export function noSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value && control.value.includes(' ')) {
            return { 'containsSpace': true };
        }
        return null;
    };
}

// export function strongPasswordValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//         const password = control.value;
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasLowerCase = /[a-z]/.test(password);
//         const hasNumeric = /[0-9]/.test(password);
//         const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

//         const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && password.length >= 8;

//         if (!valid) {
//             return { 'strongPassword': true };
//         }
//         return null;
//     };
// }

export function strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const password = control.value;
        if (!password) {
            return null;
        }
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumeric = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        const hasNoSpaces = !/\s/.test(password);

        const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && hasNoSpaces && password.length >= 8;

        if (!valid) {
            return { 'strongPassword': true };
        }
        return null;
    };
}