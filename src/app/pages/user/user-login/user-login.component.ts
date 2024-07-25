import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../core/services/user/login.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginFormValue, ILoginResponse } from '../../../core/models/user/login.interface';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { loginFields } from '../../../shared/configs/user/loginForm.config';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { noWhitespaceValidator, strongPasswordValidator } from '../../../shared/validators/validators';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [UsernavComponent, RouterModule, CommonModule, ReactiveFormsModule, FormComponent, FooterComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent {
  loginForm: FormGroup;
  loginFields: FormField[] = loginFields;
  timestamp = new Date().getTime();

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]],
    });
  }

  onSubmit(formValue: ILoginFormValue) {
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