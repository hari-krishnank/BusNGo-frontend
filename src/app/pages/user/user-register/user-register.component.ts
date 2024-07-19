import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupService } from '../../../core/services/user/signup.service';
import { IOtpVerificationResponse, IRegistrationResponse, IRegistrationFormValue } from '../../../core/models/user/register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, passwordMatchValidator, phoneNumberValidator } from '../../../shared/validators/validators';
import { OtpComponent } from '../otp/otp.component';
import { FormComponent } from '../../../shared/reusable/form/form.component';
import { registrationFields } from '../../../shared/configs/user/registerForm-config';
import { FormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule, UsernavComponent, FormComponent, OtpComponent],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})

export class UserRegisterComponent {
  showOtpModal: boolean = false;
  isSignUpDisabled: boolean = false;
  registrationForm: FormGroup;
  registrationFields: FormField[] = registrationFields

  constructor(private signupService: SignupService, private router: Router, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, noWhitespaceValidator()]],
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      phone: ['', [Validators.required, noWhitespaceValidator(), phoneNumberValidator()]],
      password: ['', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]],
      confirmpassword: ['', [Validators.required, noWhitespaceValidator()]]
    }, { validator: passwordMatchValidator });
  }

  onSignUp(formValue: IRegistrationFormValue) {
    this.isSignUpDisabled = true;
    const { username, email, phone, password } = formValue;
    this.signupService.initiateRegistration(username, email, phone, password).subscribe(
      (response: IRegistrationResponse) => {
        console.log('Registration initiated:', response);
        this.showOtpModal = true;
      },
      error => {
        console.error('Registration initiation failed:', error);
        this.isSignUpDisabled = false;
        if (error.message === 'Email already registered') {
          this.registrationForm.get('email')?.setErrors({ 'alreadyRegistered': true });
        }
      }
    );
  }

  onVerifyOtp(event: { email: string, otp: number }) {
    console.log('Verifying OTP:', event);
    this.signupService.verifyOtp(event.email, event.otp).subscribe(
      (response: IOtpVerificationResponse) => {
        console.log('OTP verified:', response);
        this.showOtpModal = false;
        this.router.navigate(['/userLogin']);
      },
      error => {
        console.error('OTP verification failed:', error);
      }
    );
  }

  closeOtpModal() {
    this.showOtpModal = false;
    this.isSignUpDisabled = false;
  }
}