import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../core/services/user/login.service';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-banner',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './notification-banner.component.html',
  styleUrl: './notification-banner.component.css'
})
export class NotificationBannerComponent implements OnInit, OnDestroy {
  isVisible = true;
  private loginStatusSubscription!: Subscription;

  constructor(private router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
    this.loginStatusSubscription = this.loginService.loginStatus$.subscribe(
      isLoggedIn => {
        this.isVisible = !isLoggedIn;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  closeBanner() {
    this.isVisible = false;
  }

  register() {
    this.router.navigate(['/user/register'])
  }
}