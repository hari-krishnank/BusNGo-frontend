import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router } from '@angular/router';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AdminSideNavComponent, CommonModule, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private adminLoginService: AdminLoginService, private router: Router, private message: NzMessageService) { }

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
        this.users = data;
        this.totalItems = this.users.length;
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
    const filtered = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
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

  toggleUserBlock(user: any) {
    this.adminLoginService.toggleUserBlock(user._id, !user.is_blocked).subscribe(
      (response) => {
        user.is_blocked = !user.is_blocked;
        this.message.success(`User ${user.is_blocked ? 'blocked' : 'unblocked'} successfully`);
      },
      (error) => {
        console.error('Error toggling user block status', error);
        this.message.error('Failed to update user status. Please try again.');
      }
    );
  }
}