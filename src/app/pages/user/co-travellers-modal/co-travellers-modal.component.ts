import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { noWhitespaceValidator, usernameValidator } from '../../../shared/validators/validators';
import { CoTravellerService } from '../../../core/services/user/co-traveller.service';
import { CommonModule } from '@angular/common';
import { coTravellerAddressField, coTravellerAgeField, coTravellerCityField, coTravellerContryField, coTravellerEmailField, coTravellerFirstNameField, coTravellerLastNameField, coTravellerMobileField, coTravellerPinCodeField, coTravellerStateField } from '../../../shared/configs/user/coTravellerForm.config';

@Component({
  selector: 'app-co-travellers-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './co-travellers-modal.component.html',
  styleUrl: './co-travellers-modal.component.css'
})
export class CoTravellersModalComponent implements OnInit {
  coTravellerForm!: FormGroup;
  coTravellerFirstNameField: FormField[] = coTravellerFirstNameField;
  coTravellerLastNameField: FormField[] = coTravellerLastNameField;
  coTravellerAgeField: FormField[] = coTravellerAgeField;
  coTravellerEmailField: FormField[] = coTravellerEmailField;
  coTravellerMobileField: FormField[] = coTravellerMobileField;
  coTravellerAddressField: FormField[] = coTravellerAddressField;
  coTravellerCityField: FormField[] = coTravellerCityField;
  coTravellerStateField: FormField[] = coTravellerStateField;
  coTravellerPinCodeField: FormField[] = coTravellerPinCodeField;
  coTravellerCountryField: FormField[] = coTravellerContryField;

  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private coTravellerService: CoTravellerService,
    private dialogRef: MatDialogRef<CoTravellersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.data) {
      this.isEditing = true;
      this.coTravellerForm.patchValue(this.data);
    }
  }

  initForm(): void {
    this.coTravellerForm = this.fb.group({
      firstName: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
      lastName: ['', [Validators.required, noWhitespaceValidator(), usernameValidator()]],
      age: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      streetAddress: [''],
      city: [''],
      state: [''],
      pinZipCode: [''],
      country: ['']
    });
  }

  onSubmit(): void {
    if (this.coTravellerForm.valid) {
      if (this.isEditing) {
        this.coTravellerService.updateCoTraveller(this.data._id, this.coTravellerForm.value).subscribe(
          (response) => {
            console.log('Co-traveller updated:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error updating co-traveller:', error);
          }
        );
      } else {
        this.coTravellerService.createCoTraveller(this.coTravellerForm.value).subscribe(
          (response) => {
            console.log('Co-traveller created:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error creating co-traveller:', error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}