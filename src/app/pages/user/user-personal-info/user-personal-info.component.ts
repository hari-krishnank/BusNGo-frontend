import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { noWhitespaceValidator, phoneNumberValidator, usernameValidator } from '../../../shared/validators/validators';
import { profileDobField, profileEmailField, profileFirstNameField, profileLastNameField, profileMobileNumberField } from '../../../shared/configs/user/personalDetailsForm.config';
import { CommonModule } from '@angular/common';
import { UserProfile, UserProfileService } from '../../../core/services/user/user-profile.service';

@Component({
  selector: 'app-user-personal-info',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './user-personal-info.component.html',
  styleUrl: './user-personal-info.component.css'
})
export class UserPersonalInfoComponent implements OnInit {
  @Output() profileUpdated = new EventEmitter<void>();
  personalDetailsForm!: FormGroup;
  profileEmailField: FormField[] = profileEmailField;
  profileMobileField: FormField[] = profileMobileNumberField;
  profileFirstNameField: FormField[] = profileFirstNameField;
  profileLastNameField: FormField[] = profileLastNameField;
  profileDobField: FormField[] = profileDobField;
  isEditing: boolean = false;
  userProfile: UserProfile | null = null;

  constructor(private fb: FormBuilder, private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUserProfile();
  }

  initForm(): void {
    this.personalDetailsForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      mobileNumber: ['', [Validators.required, phoneNumberValidator()]],
      firstName: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
      lastName: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.disableForm();
  }

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(
      (profile: UserProfile) => {
        this.userProfile = profile;
        const formattedDob = profile.dob ? this.formatDate(new Date(profile.dob)) : '';
        this.personalDetailsForm.patchValue({
          email: profile.email,
          mobileNumber: profile.phone,
          firstName: profile.username,
          lastName: profile.lastName,
          dob: formattedDob,
          gender: profile.gender || ''
        });
      },
      error => {
        console.error('Error loading user profile:', error);
      }
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.enableForm();
    } else {
      this.disableForm();
    }
  }

  saveDetails(): void {
    if (this.personalDetailsForm.valid) {
      const updatedProfile = {
        ...this.userProfile,
        ...this.personalDetailsForm.value,
        username: this.personalDetailsForm.get('firstName')?.value,
        phone: this.personalDetailsForm.get('mobileNumber')?.value
      };

      console.log(updatedProfile);


      this.userProfileService.updateUserProfile(updatedProfile).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.isEditing = false;
          this.disableForm();
          this.loadUserProfile();
          this.profileUpdated.emit(); 
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      console.log('Form is invalid');
      Object.values(this.personalDetailsForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.disableForm();
    this.loadUserProfile();
  }

  private disableForm(): void {
    Object.keys(this.personalDetailsForm.controls).forEach(key => {
      this.personalDetailsForm.get(key)?.disable();
    });
  }

  private enableForm(): void {
    Object.keys(this.personalDetailsForm.controls).forEach(key => {
      if (key !== 'email') {
        console.log(key);

        this.personalDetailsForm.get(key)?.enable();
      }
    }); 
  }
}