import { Component } from '@angular/core';
import { AdminnavComponent } from '../../../shared/widgets/adminnav/adminnav.component';
import { AdminfooterComponent } from '../../../shared/widgets/adminfooter/adminfooter.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [AdminnavComponent, AdminfooterComponent, CommonModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private adminLoginService: AdminLoginService, private router: Router) { }

  onSubmit() {
    this.adminLoginService.login(this.email, this.password).subscribe(
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
