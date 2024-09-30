import { Component, Inject } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { RouterModule } from '@angular/router';
import { OwnerDetailsComponent } from '../owner-details/owner-details.component';
import { signupService } from '../../../core/services/busOwner/signup/signup.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { ownerOtpFields } from '../../../shared/configs/busOwner/otpForm-config';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-owner-otp',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, OwnernavComponent, OwnerFooterComponent, OwnerFaqComponent, OwnerDetailsComponent, FormComponent],
  templateUrl: './owner-otp.component.html',
  styleUrl: './owner-otp.component.css'
})
export class OwnerOtpComponent {
  otpForm: FormGroup;
  ownerOtpFields: FormField[] = ownerOtpFields
  remainingTime: number = 60;
  canResend: boolean = false;
  private timer: any;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<OwnerOtpComponent>, @Inject(MAT_DIALOG_DATA) public data: { email: string }, private signupService: signupService) {
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]]
    });
    this.startTimer();
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otp = this.otpForm.get('otp')?.value;
      this.dialogRef.close(otp);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  resendOtp(): void {
    if (this.canResend) {
      this.signupService.resendOtp(this.data.email).subscribe(
        () => {
          console.log('OTP resent successfully');
          this.startTimer();
        },
        error => {
          console.error('Error resending OTP', error);
        }
      );
    }
  }

  startTimer() {
    this.remainingTime = 60;
    this.canResend = false;

    this.timer = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        clearInterval(this.timer);
        this.canResend = true;
      }
    }, 1000);
  }
}