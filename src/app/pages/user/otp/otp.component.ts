import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../shared/validators/validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {
  @Input() email: string = '';
  @Output() verifyOtp = new EventEmitter<{email: string, otp: number}>();
  @Output() closeModal = new EventEmitter<void>();

  otpForm: FormGroup;
  value: string = ''

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$'), noWhitespaceValidator()]]
    });
  }

  onSubmit() {
    if (this.otpForm.valid) {
      const otp = parseInt(this.otpForm.get('otp')?.value, 10);
      console.log('verify cheyunna otp',otp);
      
      this.verifyOtp.emit({email: this.email, otp: otp});
    }
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}