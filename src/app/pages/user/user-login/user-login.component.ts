import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../core/services/user/login.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginResponse } from '../../../core/models/user/login';
import { FormComponent } from '../../../shared/reusable/form/form.component';
import { loginFields } from '../../../shared/configs/user/loginForm-config';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [UsernavComponent, RouterModule, CommonModule, ReactiveFormsModule, FormComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent {
  loginForm: FormGroup;
  loginFields = loginFields;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(formValue: any) {
    console.log('Login attempt:', formValue);
    this.loginService.login(formValue.email, formValue.password).subscribe({
      next: (response: ILoginResponse) => {
        this.loginService.setToken(response.access_token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
} 