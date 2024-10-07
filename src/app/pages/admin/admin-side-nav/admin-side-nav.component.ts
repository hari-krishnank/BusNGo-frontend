import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router, RouterModule } from '@angular/router';
import { UsersListComponent } from '../users-list/users-list.component';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OwnerRequestsService } from '../../../core/services/admin/owner-requests.service';

@Component({
  selector: 'app-admin-side-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, AdminNavComponent, UsersListComponent, BusOwnerfooterComponent],
  templateUrl: './admin-side-nav.component.html',
  styleUrl: './admin-side-nav.component.css'
})
export class AdminSideNavComponent implements OnInit {
  @Input() isCollapsed = false;
  @Output() sidebarStateChange = new EventEmitter<boolean>();
  pendingRequestsCount: number = 0;

  constructor(private adminLoginService: AdminLoginService, private router: Router, private ownerRequestsService: OwnerRequestsService) { }

  ngOnInit() {
    this.getPendingRequestsCount();
  }

  getPendingRequestsCount() {
    this.ownerRequestsService.getPendingRequestsCount().subscribe(
      (count: number) => {
        this.pendingRequestsCount = count;
        console.log('Pending requests count:', this.pendingRequestsCount);
      },
      (error) => {
        console.error('Error fetching pending requests count:', error);
      }
    );
  }

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