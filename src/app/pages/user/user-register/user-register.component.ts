import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupService } from '../../../core/services/user/signup.service';
import { IOtpVerificationResponse, IRegistrationResponse, IRegistrationFormValue } from '../../../core/models/user/register.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, passwordMatchValidator, phoneNumberValidator, strongPasswordValidator, usernameValidator } from '../../../shared/validators/validators';
import { OtpComponent } from '../otp/otp.component';
import { FormComponent } from '../../../shared/reusableComponents/inputForm/form/form.component';
import { registrationFields } from '../../../shared/configs/user/registerForm.config';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule, UsernavComponent, FormComponent, OtpComponent, FooterComponent, ToastrModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})

export class UserRegisterComponent {
  showOtpModal: boolean = false;
  isSignUpDisabled: boolean = false;
  registrationForm: FormGroup;
  registrationFields: FormField[] = registrationFields
  timestamp = new Date().getTime();

  constructor(private signupService: SignupService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private dialog: MatDialog) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      phone: ['', [Validators.required, phoneNumberValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]],
      confirmpassword: ['', [Validators.required, noWhitespaceValidator()]]
    }, {
      validators: passwordMatchValidator('password', 'confirmpassword')
    })
  }

  onSignUp(formValue: IRegistrationFormValue) {
    this.isSignUpDisabled = true;
    const { username, email, phone, password } = formValue;
    this.signupService.initiateRegistration(username, email, phone, password).subscribe(
      (response: IRegistrationResponse) => {
        console.log('Registration initiated:', response);
        this.showOtpModal = true;
        this.openOtpModal(formValue.email);
      },
      error => {
        console.error('Registration initiation failed:', error);
        this.isSignUpDisabled = false;
        if (error.message === 'Email already registered') {
          this.toastr.error('This email is already registered.', 'Registration Error');
          this.registrationForm.get('email')?.setErrors({ 'alreadyRegistered': true });
        } else {
          this.toastr.error('An error occurred during registration. Please try again.', 'Registration Error');
        }
      }
    );
  }

  openOtpModal(email: string) {
    const otpComponent = new OtpComponent(this.fb, this.signupService);
    otpComponent.email = email;

    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Enter OTP',
        fields: otpComponent.otpFields,
        submitButtonText: 'Verify OTP',
        form: otpComponent.otpForm,
        showResendOtp: true,
        resendCooldown: 60
      },
      width: '400px'
    });

    dialogRef.componentInstance.formSubmitted.subscribe((result) => {
      if (result) {
        this.onVerifyOtp({ email: email, otp: parseInt(result.otp, 10) });
      }
    });

    dialogRef.componentInstance.resendOtp.subscribe(() => {
      this.onResendOtp(email);
    });
  }

  onResendOtp(email: string) {
    this.signupService.resendOtp(email).subscribe({
      next: (response) => {
        this.toastr.success('OTP resent successfully', 'Success');
      },
      error: (error) => {
        this.toastr.error('Failed to resend OTP. Please try again.', 'Error');
      }
    });
  }

  onVerifyOtp(event: { email: string, otp: number }) {
    console.log('Verifying OTP:', event);
    this.signupService.verifyOtp(event.email, event.otp).subscribe({
      next: (response: IOtpVerificationResponse) => {
        if (response.success) {
          console.log('OTP verified:', response);
          this.showOtpModal = false;
          this.dialog.closeAll();
          this.toastr.success('OTP verified successfully', 'Success');
          this.router.navigate(['/userLogin']);
        } else {
          console.error('OTP verification failed:', response);
          this.toastr.error('Invalid OTP. Please try again.', 'Verification Failed');
        }
      },
      error: (error) => {
        console.error('OTP verification request failed:', error);
        this.toastr.error('An error occurred. Please try again.', 'Verification Error');
      }
    });
  }

  closeOtpModal() {
    this.showOtpModal = false;
    this.isSignUpDisabled = false;
  }
}