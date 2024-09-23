import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-side-bar',
  standalone: true,
  imports: [MatButtonModule, RouterModule, CommonModule],
  templateUrl: './profile-side-bar.component.html',
  styleUrl: './profile-side-bar.component.css'
})
export class ProfileSideBarComponent {
  constructor(private router: Router) {}

  isRouteActive(routes: string[]): boolean {
    return routes.some(route => this.router.isActive(route, true));
  }
}