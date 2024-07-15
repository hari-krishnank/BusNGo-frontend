import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../core/services/user/login.service';

@Component({
  selector: 'app-notification-banner',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification-banner.component.html',
  styleUrl: './notification-banner.component.css'
})
export class NotificationBannerComponent implements OnInit {
  isVisible = true;

  constructor(private router: Router, public loginService: LoginService) { }
  
  ngOnInit(): void {
    this.isVisible = !this.loginService.isLoggedIn();
  }

  closeBanner() {
    this.isVisible = false;
  }

  register() {
    this.router.navigate(['/userRegister'])
  }
}