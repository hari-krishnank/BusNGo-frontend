import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { StaffAuthService } from '../../../core/services/staffs/staffAuth.service';

@Component({
  selector: 'app-staffnav',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './staffnav.component.html',
  styleUrl: './staffnav.component.css'
})
export class StaffnavComponent {
  @Input() showLoginButton: boolean = true;
  @Input() showLogoutButton: boolean = true;

  constructor(private router: Router, private staffService: StaffAuthService) { }

  navigateToLogin() {
    this.router.navigate(['/staffLogin'])
  }

  logout() {
    this.staffService.logout()
  }
}