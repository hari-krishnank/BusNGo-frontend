import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router } from '@angular/router';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private adminLoginService: AdminLoginService, private router: Router) { }

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

  toggleBlockStatus(user: any) {
    const newBlockStatus = !user.is_blocked;
    this.adminLoginService.updateUserBlockStatus(user._id, newBlockStatus).subscribe(
      () => {
        user.is_blocked = newBlockStatus;
      },
      (error) => {
        console.error('Error updating user block status', error);
      }
    );
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
}