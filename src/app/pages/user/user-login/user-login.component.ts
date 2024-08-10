import { Component } from '@angular/core';
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

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [UsernavComponent, RouterModule, CommonModule, ReactiveFormsModule, FormComponent, FooterComponent, MatButtonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent {
  loginForm: FormGroup;
  loginFields: FormField[] = loginFields;
  timestamp = new Date().getTime();

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]],
    });
  }

  onSubmit(formValue: ILoginFormValue) {
    this.loginService.login(formValue.email, formValue.password).subscribe({
      next: (response: ILoginResponse) => {
        this.loginService.setToken(response.access_token);
        this.checkUserBlockStatus();
      },
      error: (error) => {
        console.error('Login failed', error);
        if (error.message === 'ACCOUNT_BLOCKED') {
          this.toastr.error('Your account has been blocked. Please contact support.', 'Access Denied');
        } else if (error.message === 'INVALID_CREDENTIALS') {
          this.toastr.error('Invalid email or password. Please try again.', 'Login Failed');
        } else {
          this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
        }
      }
    });
  }

  private checkUserBlockStatus() {
    this.loginService.checkUserBlockStatus().subscribe({
      next: (isBlocked: boolean) => {
        if (isBlocked) {
          this.handleBlockedUser();
        } else {
          this.handleSuccessfulLogin();
        }
      },
      error: (error) => {
        console.error('Error checking block status', error);
        // this.toastr.warning('Unable to verify account status. Proceeding with caution.', 'Warning');
        // this.router.navigate(['/home']);
        this.handleSuccessfulLogin();
      }
    });
  }

  private handleBlockedUser() {
    this.loginService.logout();
    this.toastr.error('Your account has been blocked. Please contact support.', 'Access Denied');
    this.router.navigate(['/userLogin']);
  }

  private handleSuccessfulLogin() {
    this.toastr.success('Welcome back!', 'Login Successful');
    this.router.navigate(['/home']);
  }
} 