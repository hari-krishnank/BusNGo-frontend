import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { noWhitespaceValidator, phoneNumberValidator, usernameValidator } from '../../../shared/validators/validators';
import { profileDobField, profileEmailField, profileFirstNameField, profileLastNameField, profileMobileNumberField } from '../../../shared/configs/user/personalDetailsForm.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-personal-info',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, FormComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './user-personal-info.component.html',
  styleUrl: './user-personal-info.component.css'
})
export class UserPersonalInfoComponent implements OnInit {
  personalDetailsForm!: FormGroup;
  profileEmailField: FormField[] = profileEmailField;
  profileMobileField: FormField[] = profileMobileNumberField;
  profileFirstNameField: FormField[] = profileFirstNameField;
  profileLastNameField: FormField[] = profileLastNameField;
  profileDobField: FormField[] = profileDobField;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      email: [{ value: 'hkharikrishnan23@gmail.com', disabled: true }],
      mobileNumber: ['', [Validators.required, phoneNumberValidator()]],
      firstName: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
      lastName: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
      dob: ['', Validators.required],
      gender: ['', Validators.required]
    });
    this.disableForm();
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
      console.log('Saving details:', this.personalDetailsForm.value);
      this.isEditing = false;
      this.disableForm();
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
    this.personalDetailsForm.reset({
      email: 'hkharikrishnan23@gmail.com',
      mobileNumber: '',
      firstName: '',
      lastName: '',
      dob: '',
      gender: ''
    });
  }

  private disableForm(): void {
    Object.keys(this.personalDetailsForm.controls).forEach(key => {
      if (key !== 'email') {
        this.personalDetailsForm.get(key)?.disable();
      }
    });
  }

  private enableForm(): void {
    Object.keys(this.personalDetailsForm.controls).forEach(key => {
      if (key !== 'email') {
        this.personalDetailsForm.get(key)?.enable();
      }
    });
  }
}