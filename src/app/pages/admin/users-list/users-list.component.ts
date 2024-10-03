import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router, RouterModule } from '@angular/router';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { usersColumns } from '../../../shared/data/admin/users.columns';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersResponse } from '../../../core/models/admin/users.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AdminSideNavComponent, CommonModule, FormsModule, RouterModule, DataTableComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  isSidebarCollapsed: boolean = false;
  usersData: any[] = []
  usersColumns = usersColumns;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private adminLoginService: AdminLoginService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.verifyAdmin();
    this.loadVerifiedUsers();
  }

  verifyAdmin() {
    if (!this.adminLoginService.getToken()) {
      this.router.navigate(['/admin']);
    }
  }

  onSidebarStateChange(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  loadVerifiedUsers() {
    this.adminLoginService.getVerifiedUsers(this.currentPage, this.itemsPerPage).subscribe(
      (response: UsersResponse) => {
        this.usersData = response.users.map((user, index) => ({
          ...user,
          fullName: user.lastName ? `${user.username} ${user.lastName}` : user.username,
          siNumber: (this.currentPage - 1) * this.itemsPerPage + index + 1
        }));
        this.totalItems = response.total; 
      },
      (error) => {
        console.error('Error fetching verified users', error);
        this.showMessage('Failed to load users. Please try again.');
      }
    );
  }
 
  onBlockUnblock(user: any) {
    this.adminLoginService.toggleUserBlock(user._id, !user.is_blocked).subscribe(
      (response) => {
        user.is_blocked = !user.is_blocked;
        this.showMessage(`${user.fullName} has been successfully ${user.is_blocked ? 'blocked' : 'unblocked'}.`);
      },
      (error) => {
        console.error('Error toggling user block status', error);
        this.showMessage('Failed to update user status. Please try again.');
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadVerifiedUsers();
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}