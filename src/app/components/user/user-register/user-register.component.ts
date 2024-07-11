import { Component, OnInit } from '@angular/core';
import { UsernavComponent } from '../common/usernav/usernav.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupService } from '../../../services/user/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { IOtpVerificationResponse, IRegistrationResponse } from '../../../models/user/register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, passwordMatchValidator } from '../../../shared/validators/validators';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UsernavComponent,
    HttpClientModule
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {

  showOtpArea: boolean = false;
  isSignUpDisabled: boolean = false;
  remainingTime: number = 0;
  timerInterval: any;

  registrationForm !: FormGroup;
  otpForm !: FormGroup;

  constructor(
    private signupService: SignupService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, noWhitespaceValidator()]],
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      phone: ['', [Validators.required, noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(3),noWhitespaceValidator()]],
      confirmpassword: ['', [Validators.required,noWhitespaceValidator()]]
    }, { validator: passwordMatchValidator });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{5}$'),noWhitespaceValidator()]]
    });
  }

  ngOnInit() {
    this.resetTimer();
  }

  onSignUp() {
    if (this.registrationForm.valid) {
      this.isSignUpDisabled = true;
      const { username, email, phone, password } = this.registrationForm.value;
      this.signupService.initiateRegistration(username, email, phone, password).subscribe(
        (response: IRegistrationResponse) => {
          console.log('Registration initiated:', response);
          this.showOtpArea = true;
          this.startTimer();
        },
        error => {
          console.error('Registration initiation failed:', error);
          this.isSignUpDisabled = false;
          if (error.message === 'Email already registered') {
            this.registrationForm.get('email')?.setErrors({'alreadyRegistered': true});
          }
        }
      );
    }
  }

  onVerifyOtp() {
    if (this.otpForm.valid) {
      const email = this.registrationForm.get('email')?.value;
      const otp = this.otpForm.get('otp')?.value;
      if (email && otp) {
        this.signupService.verifyOtp(email, Number(otp)).subscribe(
          (response: IOtpVerificationResponse) => {
            console.log('OTP verified:', response);
            this.router.navigate(['/userLogin']);
          },
          error => {
            console.error('OTP verification failed:', error);
          }
        );
      }
    }
  }

  startTimer() {
    this.remainingTime = 60;
    this.timerInterval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        this.resetTimer();
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.remainingTime = 0;
    this.isSignUpDisabled = false;
  }

  resendOtp() {
    this.onSignUp();
  }
}