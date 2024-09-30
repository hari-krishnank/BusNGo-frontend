import { Component } from '@angular/core';
import { StaffnavComponent } from '../../../shared/widgets/staffnav/staffnav.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { staffLoginFrom } from '../../../shared/configs/staffs/staffLoginForm-config';
import { noWhitespaceValidator, strongPasswordValidator } from '../../../shared/validators/validators';
import { Router } from '@angular/router';
import { StaffAuthService } from '../../../core/services/staffs/staffAuth.service';

@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [StaffnavComponent, MatIconModule, CommonModule, FormComponent],
  templateUrl: './staff-login.component.html',
  styleUrl: './staff-login.component.css'
})
export class StaffLoginComponent {
  staffLoginForm: FormGroup;
  staffLoginFields: FormField[] = staffLoginFrom;

  constructor(private fb: FormBuilder,  private staffAuthService: StaffAuthService,private router: Router) {
    this.staffLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]],
    });
  }

  onLogin(formValue: any) {
    if (this.staffLoginForm.valid) {
      this.staffAuthService.login(formValue.email, formValue.password).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/staff/dashboard']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    }
  }
}