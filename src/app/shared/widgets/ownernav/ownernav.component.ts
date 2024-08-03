import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { signupService } from '../../../core/services/busOwner/signup/signup.service';

@Component({
  selector: 'app-ownernav',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, RouterModule, MatMenuModule, CommonModule],
  templateUrl: './ownernav.component.html',
  styleUrl: './ownernav.component.css'
})
export class OwnernavComponent {
  constructor(private signupService: signupService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.signupService.isLoggedIn();
  }

  logout(): void {
    this.signupService.logout();
    this.router.navigate(['/ownerLogin']);
  }
}
