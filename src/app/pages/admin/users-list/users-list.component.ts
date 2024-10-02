import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router, RouterModule } from '@angular/router';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { usersColumns } from '../../../shared/data/admin/users.columns';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AdminSideNavComponent, CommonModule, FormsModule, RouterModule, DataTableComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  usersData: any[] = []
  usersColumns = usersColumns;
  filteredUsers: any[] = [];
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  isSidebarCollapsed: boolean = false;

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

  loadVerifiedUsers() {
    this.adminLoginService.getVerifiedUsers().subscribe(
      (data) => {
        this.usersData = data.map(user => ({
          ...user,
          fullName: user.lastName ? `${user.username} ${user.lastName}` : user.username
        }));
        this.totalItems = this.usersData.length;
        this.updateFilteredUsers();
      },
      (error) => {
        console.error('Error fetching verified users', error);
      }
    );
  }

  onSearch() {
    this.currentPage = 1;
    this.updateFilteredUsers();
  }

  updateFilteredUsers() {
    const filtered = this.usersData.filter(user =>
      user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.phone.includes(this.searchTerm)
    );

    this.totalItems = filtered.length;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredUsers = filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateFilteredUsers();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getMaxItemsOnPage(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
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

  onSidebarStateChange(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}