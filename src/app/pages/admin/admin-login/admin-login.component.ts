import { Component } from '@angular/core';
import { AdminfooterComponent } from '../../../shared/widgets/adminfooter/adminfooter.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { adminLoginFields } from '../../../shared/configs/admin/adminLogin.config';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [AdminfooterComponent, CommonModule, FormsModule, FormComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  adminLoginForm!: FormGroup;
  adminLoginFields: FormField[] = adminLoginFields;

  constructor(private fb: FormBuilder, private adminLoginService: AdminLoginService, private router: Router) {
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.adminLoginForm.valid) {
      const { email, password } = this.adminLoginForm.value;
      this.adminLoginService.login(email, password).subscribe(
        response => {
          localStorage.setItem('adminToken', response.access_token);
          console.log('Token stored:', response.access_token);
          this.router.navigate(['/admin/listUsers']);
        },
        error => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}