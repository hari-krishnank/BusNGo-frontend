import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { gsap } from 'gsap';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [UsernavComponent, RouterModule, CommonModule, ReactiveFormsModule, FormComponent, FooterComponent, MatButtonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  loginFields: FormField[] = loginFields;
  timestamp = new Date().getTime();

  @ViewChild('imageDiv') imageDiv!: ElementRef;
  @ViewChild('formDiv') formDiv!: ElementRef;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]],
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
          this.toastr.error('Invalid email or password. Please try again.', 'Login Failed');
        } else {
          this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
        }
      }
    });
  }

  private handleSuccessfulLogin() {
    this.toastr.success('Welcome back!', 'Login Successful');
    this.router.navigate(['/home']);
  }
} 