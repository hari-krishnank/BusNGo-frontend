import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { MatIconModule } from '@angular/material/icon';
import { ResendOtpComponent } from '../../../pages/user/resend-otp/resend-otp.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormComponent, ReactiveFormsModule, FormsModule, ResendOtpComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogActions, MatDialogContent, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() resendOtp = new EventEmitter<void>();
  form !: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string, 
      fields: FormField[], 
      submitButtonText: string, 
      form: FormGroup,
      showResendOtp?: boolean,
      resendCooldown?: number
    },
    private fb: FormBuilder
  ) {
    this.form = this.data.form;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(formData: any): void {
    this.formSubmitted.emit(formData);
  }

  onResendOtp(): void {
    this.resendOtp.emit();
  }
}