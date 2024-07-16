import { Component, OnInit } from '@angular/core';
import { AdminnavComponent } from '../../../shared/widgets/adminnav/adminnav.component';
import { AdminfooterComponent } from '../../../shared/widgets/adminfooter/adminfooter.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [AdminnavComponent, AdminfooterComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{
  loginForm !: FormGroup;

  constructor(private fb: FormBuilder, private adminLoginService: AdminLoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
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
