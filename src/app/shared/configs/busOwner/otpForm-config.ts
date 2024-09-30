import { Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../shared/validators/validators';
import { FormField } from '../../../core/models/user/form-fields.interface';

export const ownerOtpFields: FormField[] = [
    {
        name: 'otp',
        label: 'OTP',
        type: 'text',
        placeholder: 'Enter 5-digit OTP',
        errors: [
            { type: 'required', message: 'OTP is required' },
            { type: 'pattern', message: 'OTP must be 5 digits' },
            { type: 'whitespace', message: 'OTP cannot be empty or consist only of spaces' }
        ],
        validators: [Validators.required, Validators.pattern('^[0-9]{5}$'), noWhitespaceValidator()]
    }
];