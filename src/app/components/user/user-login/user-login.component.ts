import { Component } from '@angular/core';
import { UsernavComponent } from '../common/usernav/usernav.component';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/user/login.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginResponse } from '../../../models/user/login';

@Component({
  selector: 'app-user-login',  
  standalone: true,
  imports: [
    UsernavComponent,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(3),
      ]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login attempt:', { email, password });
      this.loginService.login(email, password).subscribe({
        next: (response: ILoginResponse) => {
          this.loginService.setToken(response.access_token);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }  
} 