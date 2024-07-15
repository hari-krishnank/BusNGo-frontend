import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminnavComponent } from '../../../shared/widgets/adminnav/adminnav.component';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-side-nav',
  standalone: true,
  imports: [CommonModule, AdminnavComponent],
  templateUrl: './admin-side-nav.component.html',
  styleUrl: './admin-side-nav.component.css'
})
export class AdminSideNavComponent {
  constructor(private adminLoginService: AdminLoginService, private router: Router) { }

  logout() {
    this.adminLoginService.removeToken()
    this.router.navigate(['/admin'])
  }
}