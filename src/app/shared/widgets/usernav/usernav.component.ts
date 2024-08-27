import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../core/services/user/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usernav',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, RouterModule, CommonModule],
  templateUrl: './usernav.component.html',
  styleUrl: './usernav.component.css'
})
export class UsernavComponent implements OnInit {
  username: string = '';

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.updateUsername();
  }
  
  updateUsername() {
    const userInfo = this.loginService.getUserInfo();
    this.username = userInfo ? userInfo.username || userInfo.email : '';
  }

  logout() {
    this.loginService.logout();
    this.username = '';
    this.router.navigate(['/home']);
  }
}
