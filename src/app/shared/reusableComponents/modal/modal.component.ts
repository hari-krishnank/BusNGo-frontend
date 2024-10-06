import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { MatIconModule } from '@angular/material/icon';
import { ResendOtpComponent } from '../../../pages/user/resend-otp/resend-otp.component';
import { modalAnimation } from '../../animations/modal.animation';
import { SeatPreviewComponent } from '../../../pages/busOwner/seat-preview/seat-preview.component';
import { FormComponent } from '../form/form.component';

interface FieldConfig {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormComponent, ReactiveFormsModule, FormsModule, ResendOtpComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogActions, MatDialogContent, MatIconModule, SeatPreviewComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  animations: [modalAnimation]
})
export class ModalComponent {
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() resendOtp = new EventEmitter<void>();
  form?: FormGroup;
  selectedSeats: string[] = [];
  submitButtonText!: string;
  displayFields: { [key: string]: FieldConfig } = {
    firstName: { label: 'First Name', icon: 'person' },
    lastName: { label: 'Last Name', icon: 'person' },
    email: { label: 'Email', icon: 'email' },
    mobile: { label: 'Mobile', icon: 'phone' },
    agencyName: { label: 'Agency Name', icon: 'business' },
    designation: { label: 'Designation', icon: 'work' },
    country: { label: 'Country', icon: 'public' },
    state: { label: 'State', icon: 'map' },
    city: { label: 'City', icon: 'location_city' },
    registeredAddress: { label: 'Address', icon: 'place' },
    postalCode: { label: 'Postal Code', icon: 'markunread_mailbox' },
    address: { label: 'Address', icon: 'place' },
  };

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      fields?: FormField[],
      submitButtonText?: string,
      form?: FormGroup,
      showResendOtp?: boolean,
      resendCooldown?: number,
      existingLayout?: any,
      preventCloseOnSubmit?: boolean,
      viewDetailsData?: any
    },
    private fb: FormBuilder
  ) {
    this.submitButtonText = this.data.submitButtonText || 'Submit';
    if (this.data.form) {
      this.form = this.data.form;
      if (!this.form.get('selectedSeats') && this.data.existingLayout) {
        this.form.addControl('selectedSeats', this.fb.control(this.data.existingLayout?.selectedSeats || []));
      }
      if (this.data.existingLayout) {
        this.form.patchValue({
          rows: this.data.existingLayout.rows,
          columns: this.data.existingLayout.columns,
          driverSeatPosition: this.data.existingLayout.driverSeatPosition,
          selectedSeats: this.data.existingLayout.selectedSeats
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(formData: any): void {
    if (this.form && this.form.valid) {
      console.log('Form data to save:', formData);
      this.formSubmitted.emit(formData);
      if (!this.data.preventCloseOnSubmit) {
        this.dialogRef.close(formData);
      }
    } else if (this.form) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onResendOtp(): void {
    this.resendOtp.emit();
  }

  onSeatsSelected(seats: string[]) {
    if (this.form) {
      this.form.patchValue({ selectedSeats: seats });
    }
  }

  getIconForField(field: string): string {
    const iconMap: { [key: string]: string } = {
      firstName: 'person',
      lastName: 'person',
      email: 'email',
      mobile: 'phone',
      agencyName: 'business',
      designation: 'work',
      country: 'public',
      state: 'map',
      city: 'location_city',
      registeredAddress: 'place',
      address: 'place',
      postalCode: 'markunread_mailbox'
    };
    return iconMap[field] || 'info';
  }

  getOrderedFields(): string[] {
    return Object.keys(this.displayFields);
  }
}