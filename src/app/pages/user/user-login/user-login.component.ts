declare var google: any;
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../core/services/user/login.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginFormValue, ILoginResponse } from '../../../core/models/user/login.interface';
import { loginFields } from '../../../shared/configs/user/loginForm.config';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { noWhitespaceValidator, strongPasswordValidator } from '../../../shared/validators/validators';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { gsap } from 'gsap';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { forgotPasswordField } from '../../../shared/configs/user/forgotPassword.config';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [UsernavComponent, RouterModule, CommonModule, ReactiveFormsModule, FormComponent, FooterComponent, MatButtonModule, NzMessageModule, MatIconModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  loginFields: FormField[] = loginFields;
  forgotPasswordFields: FormField[] = forgotPasswordField
  timestamp = new Date().getTime();
  showForgotPassword = false;

  @ViewChild('imageDiv') imageDiv!: ElementRef;
  @ViewChild('formDiv') formDiv!: ElementRef;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder, private toastr: NzMessageService, private cdr: ChangeDetectorRef) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]],
    });
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]]
    });
  }

  ngAfterViewInit() {
    this.animateElements();
    if (!this.showForgotPassword) {
      this.initializeGoogleSignIn();
    }
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

  initializeGoogleSignIn(): void {
    if (!this.showForgotPassword && document.getElementById("google-btn")) {
      google.accounts.id.initialize({
        client_id: '513831466496-3gdp5pno3ioji925p24r3f0a4kn4uso7.apps.googleusercontent.com',
        callback: this.handleGoogleSignIn.bind(this),
      });

      google.accounts.id.renderButton(document.getElementById("google-btn"), {
        theme: 'outline',
        size: 'extra large',
        type: 'standard',
        text: 'signin_with',
        shape: 'rectangular',
        width: 600,
      });
      this.cdr.detectChanges();
    }
  }

  handleGoogleSignIn(response: any) {
    console.log('Google Sign-In Response:', response);
    this.loginService.googleLogin(response.credential).subscribe({
      next: (loginResponse: ILoginResponse) => {
        console.log('Google login response:', loginResponse);
        this.loginService.setToken(loginResponse.access_token);
        this.handleSuccessfulLogin();
      },
      error: (error) => {
        console.error('Google login failed', error);
        this.toastr.error('Google login failed. Please try again.');
      }
    });
  }

  onSubmit(formValue: ILoginFormValue) {
    this.loginService.login(formValue.email, formValue.password).subscribe({
      next: (response: ILoginResponse) => {
        console.log('login cheyyumbo ulla response:', response);

        this.loginService.setToken(response.access_token);
        this.handleSuccessfulLogin()
      },
      error: (error) => {
        console.error('Login failed', error);
         if (error.message === 'ACCOUNT_BLOCKED') {
          this.toastr.error('Your account has been blocked. Please contact support.');
        } else if (error.message === 'INVALID_CREDENTIALS') {
          this.toastr.error('Invalid email or password.');
        } else {
          this.toastr.error('An unexpected error occurred. Please try again later.');
        }
      }
    });
  }

  onForgotPasswordSubmit(formValue: { email: string }) {
    console.log('Forgot password submitted for email:', formValue.email);
    this.toastr.info('Password reset instructions have been sent to your email.');
    this.toggleForgotPassword();
  }


  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
    if (this.showForgotPassword) {
      this.forgotPasswordForm.reset();
    } else {
      this.loginForm.reset();
      setTimeout(() => {
        this.initializeGoogleSignIn();
      });
    }
  }

  private handleSuccessfulLogin() {
    this.toastr.success('Welcome back! Login Successful');
    this.router.navigate(['/home']);
  }
} 