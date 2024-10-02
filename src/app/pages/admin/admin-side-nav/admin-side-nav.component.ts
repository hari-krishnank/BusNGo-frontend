import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router, RouterModule } from '@angular/router';
import { UsersListComponent } from '../users-list/users-list.component';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    AdminNavComponent,
    UsersListComponent,
    BusOwnerfooterComponent
  ],
  templateUrl: './admin-side-nav.component.html',
  styleUrl: './admin-side-nav.component.css'
})
export class AdminSideNavComponent {
  @Input() isCollapsed = false;
  @Output() sidebarStateChange = new EventEmitter<boolean>();

  constructor(private adminLoginService: AdminLoginService, private router: Router) { }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarStateChange.emit(this.isCollapsed);
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, true);
  } 

  logout() {
    this.adminLoginService.removeToken()
    this.router.navigate(['/admin'])
  }
}