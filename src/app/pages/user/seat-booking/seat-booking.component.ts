import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';

@Component({
  selector: 'app-seat-booking',
  standalone: true,
  imports: [SidebarModule, MatSidenavModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, FormsModule, MatIconModule, FormComponent],
  templateUrl: './seat-booking.component.html',
  styleUrl: './seat-booking.component.css'
})
export class SeatBookingComponent {
  sidebarVisible2: boolean = false;
  passengerDetailsForm !: FormGroup;
  formFields !: FormField[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.initFormFields();
  }

  initForm() {
    this.passengerDetailsForm = this.fb.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  initFormFields() {
    this.formFields = [
      // {
      //   name: 'gender',
      //   label: 'Gender',
      //   type: 'select',
      //   options: [
      //     { label: 'Male', value: 'male' },
      //     { label: 'Female', value: 'female' }
      //   ],
      //   validators: [Validators.required],
      //   errors: [{ type: 'required', message: 'Gender is required' }]
      // },
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'Enter first name',
        validators: [Validators.required],
        errors: [{ type: 'required', message: 'First name is required' }]
      },
      // {
      //   name: 'lastName',
      //   label: 'Last Name',
      //   type: 'text',
      //   placeholder: 'Enter last name',
      //   validators: [Validators.required],
      //   errors: [{ type: 'required', message: 'Last name is required' }]
      // },
      // {
      //   name: 'age',
      //   label: 'Age',
      //   type: 'number',
      //   placeholder: 'Enter age',
      //   validators: [Validators.required, Validators.min(1)],
      //   errors: [
      //     { type: 'required', message: 'Age is required' },
      //     { type: 'min', message: 'Age must be greater than 0' }
      //   ]
      // },
      // {
      //   name: 'mobileNumber',
      //   label: 'Mobile Number',
      //   type: 'tel',
      //   placeholder: 'Enter mobile number',
      //   validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      //   errors: [
      //     { type: 'required', message: 'Mobile number is required' },
      //     { type: 'pattern', message: 'Enter a valid 10-digit mobile number' }
      //   ]
      // },
      // {
      //   name: 'email',
      //   label: 'Email',
      //   type: 'email',
      //   placeholder: 'Enter email',
      //   validators: [Validators.required, Validators.email],
      //   errors: [
      //     { type: 'required', message: 'Email is required' },
      //     { type: 'email', message: 'Enter a valid email address' }
      //   ]
      // }
    ];
  }

  onSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
  }

  toggleSidebar() {
    this.sidebarVisible2 = !this.sidebarVisible2;
  }
}