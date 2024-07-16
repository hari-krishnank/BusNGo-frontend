import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminnavComponent } from '../../../shared/widgets/adminnav/adminnav.component';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router, RouterModule } from '@angular/router';
import { UsersListComponent } from '../users-list/users-list.component';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';

@Component({
  selector: 'app-admin-side-nav',
  standalone: true,
  imports: [CommonModule, AdminnavComponent, UsersListComponent, RouterModule, BusOwnerfooterComponent],
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