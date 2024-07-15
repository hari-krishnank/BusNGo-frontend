import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { Router } from '@angular/router';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [AdminSideNavComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  constructor(private adminLoginService: AdminLoginService, private router: Router) { }

  ngOnInit() {
    this.verifyAdmin();
  }

  verifyAdmin() {
    if (!this.adminLoginService.getToken()) {
      this.router.navigate(['/admin']);
    }
  }
}