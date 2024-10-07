import { Component, OnInit } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { Router, RouterModule } from '@angular/router';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { OwnerApiService } from '../../../core/services/busOwner/ownerDetails/owner-api.service';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { ownerConfirmPasswordField, ownerEmailField, ownerFirstNameField, ownerLastNameField, ownerMobileField, ownerPasswordField } from '../../../shared/configs/busOwner/registerForm-config';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { addressField, agencyNameField, cityField, countryField, designationField, postalCodeField, stateField } from '../../../shared/configs/busOwner/ownerRegistrationDetails-config';
import { OwnerService } from '../../../core/services/busOwner/signup/owner.service';
import { OwnerDetailsFormService } from '../../../core/services/busOwner/ownerDetails/owner-form.service';
import { MessageService } from '../../../shared/services/message.service';

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
  ownerDetails: any;

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

  constructor(private ownerApiService: OwnerApiService, private formService: OwnerDetailsFormService, private router: Router, private signupService: OwnerService, private message: MessageService) {
    this.personalInfoForm = this.formService.createPersonalInfoForm();
    this.agencyDetailsForm = this.formService.createAgencyDetailsForm();
  }

  ngOnInit() {
    const email = this.ownerApiService.getOwnerEmail();
    if (email) {
      this.personalInfoForm.patchValue({ email: email });
      this.fetchOwnerDetails(email);
    }
  }

  fetchOwnerDetails(email: string) {
    this.signupService.getOwnerDetails(email).subscribe(
      (data: any) => {
        this.ownerDetails = data;
        this.formService.populateFormsWithExistingData(this.personalInfoForm, this.agencyDetailsForm, this.ownerDetails);
      },
      (error: any) => {
        console.error('Error fetching owner details:', error);
      }
    );
  }

  onPersonalInfoSubmit() {
    if (this.personalInfoForm.valid) {
      const ownerDetails = {
        ...this.personalInfoForm.getRawValue(),
        email: this.personalInfoForm.get('email')?.value
      };

      this.ownerApiService.updateOwnerDetails(ownerDetails).subscribe(
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

      this.ownerApiService.updateOwnerDetails(agencyDetails).subscribe(
        (response) => {
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
    const email = this.ownerApiService.getOwnerEmail();
    if (email) {
      this.signupService.confirmOwnerDetails(email).subscribe(
        (response: any) => {
          this.message.showSuccessMessage(response.message);
          localStorage.removeItem('ownerEmail')
          this.router.navigate(['/owner/registration-success']);
        },
        (error: any) => {
          console.error('Error confirming owner details:', error);
          this.message.showErrorMessage('Error sending registration request. Please try again.');
        }
      );
    } else {
      this.message.showErrorMessage('Owner email not found. Please try again.');
    }
  }
}