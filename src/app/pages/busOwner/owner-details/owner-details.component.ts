import { Component, OnInit } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { Router, RouterModule } from '@angular/router';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { OwnerDetailsService } from '../../../core/services/busOwner/ownerDetails/owner-details.service';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { ownerConfirmPasswordField, ownerEmailField, ownerFirstNameField, ownerLastNameField, ownerMobileField, ownerPasswordField } from '../../../shared/configs/busOwner/registerForm-config';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { passwordMatchValidator } from '../../../shared/validators/validators';
import { HttpClient } from '@angular/common/http';
import { signupService } from '../../../core/services/busOwner/signup/signup.service';
import { addressField, agencyNameField, cityField, countryField, designationField, postalCodeField, stateField } from '../../../shared/configs/busOwner/ownerRegistrationDetails-config';

@Component({
  selector: 'app-owner-details',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatStepperModule, OwnernavComponent, BusOwnerfooterComponent, FormComponent],
  templateUrl: './owner-details.component.html',
  styleUrl: './owner-details.component.css'
})
export class OwnerDetailsComponent implements OnInit {
  personalInfoForm: FormGroup;
  agencyDetailsForm: FormGroup;
  ownerFirstNameField: FormField[] = ownerFirstNameField;
  ownerLastNameField: FormField[] = ownerLastNameField;
  ownerEmailField: FormField[] = ownerEmailField;
  ownerMobileField: FormField[] = ownerMobileField;
  ownerPasswordField: FormField[] = ownerPasswordField;
  ownerConfirmPasswordField: FormField[] = ownerConfirmPasswordField;
  agencyNameField: FormField[] = agencyNameField;
  designationField: FormField[] = designationField;
  countryField: FormField[] = countryField;
  stateField: FormField[] = stateField;
  cityField: FormField[] = cityField;
  postalCodeField: FormField[] = postalCodeField;
  addressField: FormField[] = addressField;
  ownerDetails: any;

  constructor(private ownerDetailsService: OwnerDetailsService, private router: Router, private fb: FormBuilder, private http: HttpClient, private signupService: signupService) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: passwordMatchValidator('password', 'confirmPassword') });

    this.agencyDetailsForm = this.fb.group({
      agencyName: ['', Validators.required],
      designation: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    const email = this.ownerDetailsService.getOwnerEmail();
    if (email) {
      this.personalInfoForm.patchValue({ email: email });
      this.fetchOwnerDetails(email)
    }
  }

  fetchOwnerDetails(email: string) {
    this.signupService.getOwnerDetails(email).subscribe(
      (data) => {
        this.ownerDetails = data;
        this.populateFormsWithExistingData();
      },
      (error) => {
        console.error('Error fetching owner details:', error);
      }
    );
  }

  populateFormsWithExistingData() {
    if (this.ownerDetails) {
      this.personalInfoForm.patchValue({
        firstName: this.ownerDetails.firstName,
        lastName: this.ownerDetails.lastName,
        email: this.ownerDetails.email,
        mobile: this.ownerDetails.mobile,
      });

      this.agencyDetailsForm.patchValue({
        agencyName: this.ownerDetails.agencyName,
        designation: this.ownerDetails.designation,
        country: this.ownerDetails.country,
        state: this.ownerDetails.state,
        city: this.ownerDetails.city,
        postalCode: this.ownerDetails.postalCode,
        address: this.ownerDetails.address
      });
    }
  }

  onPersonalInfoSubmit() {
    if (this.personalInfoForm.valid) {
      const ownerDetails = {
        ...this.personalInfoForm.getRawValue(),
        email: this.personalInfoForm.get('email')?.value 
      };

      this.ownerDetailsService.updateOwnerDetails(ownerDetails).subscribe(
        (response) => {
          console.log('Personal info updated successfully');
        },
        (error) => {
          console.error('Error updating personal info', error);
        }
      );
    } else {
      console.error('Personal info form is invalid');
    }
  }

  onAgencyDetailsSubmit() {
    if (this.agencyDetailsForm.valid) {
      const agencyDetails = {
        ...this.agencyDetailsForm.value,
        email: this.personalInfoForm.get('email')?.value
      };
      console.log(agencyDetails);
      
      this.http.put('http://localhost:3000/owner/update-details', agencyDetails).subscribe(
        (response) => {
          console.log('Agency details updated successfully', response);
          this.fetchOwnerDetails(agencyDetails.email);
        },
        (error) => {
          console.error('Error updating agency details', error);
        }
      );
    } else {
      console.error('Agency details form is invalid');
    }
  }

  confirmAndSubmit() {
    this.signupService.confirmOwnerDetails(this.ownerDetails.email).subscribe(
      (response) => {
        console.log('Owner confirmed and saved to verified collection successfully:', response);
        this.signupService.removeEmail();
        this.router.navigate(['/ownerLogin']);
      },
      (error) => {
        console.error('Error confirming owner details:', error);
      }
    );
  }
}