declare var google: any;
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupService } from '../../../core/services/user/signup.service';
import { IOtpVerificationResponse, IRegistrationResponse, IRegistrationFormValue } from '../../../core/models/user/register.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, passwordMatchValidator, phoneNumberValidator, strongPasswordValidator, usernameValidator } from '../../../shared/validators/validators';
import { OtpComponent } from '../otp/otp.component';
import { registrationFields } from '../../../shared/configs/user/registerForm.config';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { gsap } from 'gsap';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule, UsernavComponent, FormComponent, OtpComponent, FooterComponent, ToastrModule, MatIconModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})

export class UserRegisterComponent implements AfterViewInit, OnInit {
  showOtpModal: boolean = false;
  isSignUpDisabled: boolean = false;
  registrationForm: FormGroup;
  registrationFields: FormField[] = registrationFields
  timestamp = new Date().getTime();

  @ViewChild('imageDiv') imageDiv!: ElementRef;
  @ViewChild('formDiv') formDiv!: ElementRef;

  private otpDialogRef: MatDialogRef<ModalComponent> | null = null;

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

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '513831466496-3gdp5pno3ioji925p24r3f0a4kn4uso7.apps.googleusercontent.com',
      callback: this.handleGoogleSignUp.bind(this)
    })
    google.accounts.id.renderButton(document.getElementById("GoogleSignUp"), {
      theme: 'outline',
      size: 'extra large',
      type: 'standard',
      text: 'signup_with',
      shape: 'rectangular',
      width: 600
    })
  }

  ngAfterViewInit() {
    this.animateElements();
  }

  handleGoogleSignUp(response: any) {
    console.log("Google sign-up response:", response);
  }

  animateElements() {
    gsap.from(this.imageDiv.nativeElement, {
      duration: 1,
      x: '-100%',
      ease: 'power3.out'
    });

    gsap.from(this.formDiv.nativeElement, {
      duration: 1,
      x: '100%',
      ease: 'power3.out'
    });
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

    this.otpDialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Enter OTP',
        fields: otpComponent.otpFields,
        submitButtonText: 'Verify OTP',
        form: otpComponent.otpForm,
        showResendOtp: true,
        resendCooldown: 60,
        preventCloseOnSubmit: true
      },
      width: '400px',
      disableClose: true
    });

    this.otpDialogRef.componentInstance.formSubmitted.subscribe((result) => {
      if (result) {
        this.verifyOtpAndHandleDialog(email, parseInt(result.otp, 10));
      }
    });

    this.otpDialogRef.componentInstance.resendOtp.subscribe(() => {
      this.onResendOtp(email);
    });
  }

  private verifyOtpAndHandleDialog(email: string, otp: number) {
    this.signupService.verifyOtp(email, otp).subscribe({
      next: (response: IOtpVerificationResponse) => {
        if (response.success) {
          console.log('OTP verified:', response);
          this.showOtpModal = false;
          this.otpDialogRef?.close();
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

  closeOtpModal() {
    this.dialog.closeAll();
    this.showOtpModal = false;
    this.isSignUpDisabled = false;
  }
}