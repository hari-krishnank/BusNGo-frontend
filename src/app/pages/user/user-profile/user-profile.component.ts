import { Component, OnInit } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginService } from '../../../core/services/user/login.service';
import { MatCardModule } from '@angular/material/card';
import { UserPersonalInfoComponent } from '../user-personal-info/user-personal-info.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UsernavComponent, UserPersonalInfoComponent, ProfileSideBarComponent, FooterComponent, CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  profileImage: string | null = null;
  user: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  userInitial: string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.updateUserInfo();
  }

  updateUserInfo() {
    const userInfo = this.loginService.getUserInfo();
    if (userInfo) {
      this.profileImage = userInfo.profileImage || null;
      this.user = userInfo.username || null;
      this.email = userInfo.email || null;
      this.phone = userInfo.phone || 'Mobile number not provided';
      this.userInitial = this.user ? this.user.charAt(0).toUpperCase() : '';
    } else {
      this.profileImage = null;
      this.user = null;
      this.email = null;
      this.phone = null;
      this.userInitial = '';
    }
  }
}
