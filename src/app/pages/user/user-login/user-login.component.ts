declare var google: any;
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [UsernavComponent, RouterModule, CommonModule, ReactiveFormsModule, FormComponent, FooterComponent, MatButtonModule, NzMessageModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent implements AfterViewInit, OnInit {
  loginForm: FormGroup;
  loginFields: FormField[] = loginFields;
  timestamp = new Date().getTime();

  @ViewChild('imageDiv') imageDiv!: ElementRef;
  @ViewChild('formDiv') formDiv!: ElementRef;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder, private toastr: NzMessageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]],
    });
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '513831466496-3gdp5pno3ioji925p24r3f0a4kn4uso7.apps.googleusercontent.com',
      callback: this.handleGoogleSignIn.bind(this)
    })
    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'failed_blue',
      size: 'extra large',
      shape: 'rectangle',
      width: 600
    })
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

  ngAfterViewInit() {
    this.animateElements();
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

  onSubmit(formValue: ILoginFormValue) {
    this.loginService.login(formValue.email, formValue.password).subscribe({
      next: (response: ILoginResponse) => {
        console.log('login cheyyumbo ulla response:', response);

        this.loginService.setToken(response.access_token);
        this.handleSuccessfulLogin()
      },
      error: (error) => {
        console.error('Login failed', error);
        if (error.message === 'INVALID_CREDENTIALS') {
          this.toastr.error('Invalid email or password.');
        } else {
          this.toastr.error('An unexpected error occurred. Please try again later.');
        }
      }
    });
  }

  private handleSuccessfulLogin() {
    this.toastr.success('Welcome back! Login Successful');
    this.router.navigate(['/home']);
  }
} 