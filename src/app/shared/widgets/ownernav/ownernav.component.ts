import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/busOwner/signup/auth.service';

@Component({
  selector: 'app-ownernav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './ownernav.component.html',
  styleUrl: './ownernav.component.css'
})
export class OwnernavComponent {
  FleetMenu!: MatMenuTrigger;
  TripMenu!: MatMenuTrigger;

  constructor(private authService: AuthService) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}