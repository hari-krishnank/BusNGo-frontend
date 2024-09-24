import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../core/services/user/login.service';

@Component({
  selector: 'app-profile-side-bar',
  standalone: true,
  imports: [MatButtonModule, RouterModule, CommonModule],
  templateUrl: './profile-side-bar.component.html',
  styleUrl: './profile-side-bar.component.css'
})
export class ProfileSideBarComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  isRouteActive(routes: string[]): boolean {
    return routes.some(route => this.router.isActive(route, true));
  }

  onLogout() {
    this.loginService.logout()
    this.router.navigate(['/home']);
  }
}