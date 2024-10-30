import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../core/services/user/login.service';

@Component({
  selector: 'app-usernav',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, RouterModule, CommonModule],
  templateUrl: './usernav.component.html',
  styleUrl: './usernav.component.css'
})
export class UsernavComponent implements OnInit {
  firstName: string = '';
  profileImage: string | null = null;

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.updateUserInfo();
  }
  
  updateUserInfo() { 
    const userInfo = this.loginService.getUserInfo();
    if (userInfo) {
      this.firstName = userInfo.username || userInfo.email;
      this.profileImage = userInfo.profileImage || null;
    } else {
      this.firstName = '';
      this.profileImage = null;
    }
  }

  logout() {
    this.loginService.logout();
    this.firstName = '';
    this.profileImage = null;
    this.router.navigate(['/user/home']);
  }
}