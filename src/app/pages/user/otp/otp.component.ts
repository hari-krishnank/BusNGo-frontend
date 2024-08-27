import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupService } from '../../../core/services/user/signup.service';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { otpFields } from '../../../shared/configs/user/otp-fields.config';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  @Input() email: string = '';
  @Output() verifyOtp = new EventEmitter<{ email: string, otp: number }>();
  @Output() closeModal = new EventEmitter<void>();

  otpForm: FormGroup;
  otpFields: FormField[] = otpFields;

  constructor(private fb: FormBuilder,private signupService: SignupService) 
  {
    this.otpForm = this.fb.group({
      otp: ['', this.otpFields[0].validators]
    });
  }

  onSubmit(formData: any) {
    if (formData.otp) {
      const otp = parseInt(formData.otp, 10);
      this.verifyOtp.emit({ email: this.email, otp: otp });
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}