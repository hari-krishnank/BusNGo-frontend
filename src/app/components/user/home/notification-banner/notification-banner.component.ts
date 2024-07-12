import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-banner',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification-banner.component.html',
  styleUrl: './notification-banner.component.css'
})
export class NotificationBannerComponent {
  constructor(private router: Router) { }
  isVisible = true;

  closeBanner() {
    this.isVisible = false;
  }

  register() {
    this.router.navigate(['/userRegister'])
  }
}
