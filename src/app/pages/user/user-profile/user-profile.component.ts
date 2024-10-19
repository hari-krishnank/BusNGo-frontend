import { Component, OnInit } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { UserPersonalInfoComponent } from '../user-personal-info/user-personal-info.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { UserProfile, UserProfileService } from '../../../core/services/user/user-profile.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    UsernavComponent,
    ProfileSideBarComponent,
    UserPersonalInfoComponent,
    FooterComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  userInitial: string = '';
  fullName: string = '';

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userProfileService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.userInitial = this.getInitial(profile.username);
        this.fullName = this.getFullName(profile.username, profile.lastName);
      },
      error: (error) => {
        console.error('Error fetching user profile', error);
      }
    });
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '';
  }

  getFullName(firstName: string, lastName?: string): string {
    return lastName ? `${firstName} ${lastName}`.trim() : firstName;
  }

  onEditProfilePhoto() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.uploadProfilePhoto(file);
      }
    };
    fileInput.click();
  }

  uploadProfilePhoto(file: File) {
    this.userProfileService.uploadProfilePhoto(file).subscribe({
      next: (result) => {
        if (this.userProfile) {
          this.userProfile.profileImage = result.url;
        }
      },
      error: (error) => {
        console.error('Error uploading profile photo:', error);
      }
    });
  }

  onProfileUpdated() {
    this.loadUserProfile();
  }
}