import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router } from '@angular/router';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AdminSideNavComponent, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  users: any[] = [];

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
        console.log(this.users);

      },
      (error) => {
        console.error('Error fetching verified users', error);
      }
    );
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
}