import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { Router, RouterModule } from '@angular/router';
import { OtpComponent } from '../../user/otp/otp.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../../../core/services/busOwner/signup/signup.service';
import { CommonModule } from '@angular/common';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { ownerRegisterFields } from '../../../shared/configs/busOwner/registerForm-config';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { ownerOtpFields } from '../../../shared/configs/busOwner/otpForm-config';

@Component({
  selector: 'app-owner-register',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, OwnernavComponent, OwnerFooterComponent, OwnerFaqComponent, OtpComponent, FormComponent],
  templateUrl: './owner-register.component.html',
  styleUrl: './owner-register.component.css'
})
export class OwnerRegisterComponent {
  ownerRegisterForm: FormGroup;
  ownerRegisterFields: FormField[] = ownerRegisterFields;
  email: string = '';
  otpFields: FormField[] = ownerOtpFields


  private otpDialogRef: MatDialogRef<ModalComponent> | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: signupService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.ownerRegisterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  generateOtp(formValue: any): void {
    if (this.ownerRegisterForm.valid) {
      this.email = this.ownerRegisterForm.get('email')?.value;
      this.signupService.sendOtp(this.email).subscribe({
        next: (successMessage: string) => {
          this.showMessage(successMessage);
          this.signupService.setEmail(this.email);
          this.openOtpModal();
        },
        error: (errorMessage: string) => {
          console.error('Error sending OTP', errorMessage);
          this.showMessage(errorMessage);
        }
      });
    }
  }

  openOtpModal(): void {
    const otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });

    this.otpDialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Enter OTP',
        fields: this.otpFields,
        submitButtonText: 'Verify OTP',
        form: otpForm,
        showResendOtp: true,
        resendCooldown: 60,
        preventCloseOnSubmit: true
      },
      width: '400px',
      disableClose: true
    });

    this.otpDialogRef.componentInstance.formSubmitted.subscribe((result: { otp: string; }) => {
      if (result) {
        this.verifyOtp(this.email, parseInt(result.otp, 10));
      }
    });

    this.otpDialogRef.componentInstance.resendOtp.subscribe(() => {
      this.onResendOtp(this.email);
    });
  }

  onResendOtp(email: string) {
    this.signupService.resendOtp(email).subscribe({
      next: (response) => {
        this.showMessage('OTP resent successfully');
      },
      error: (error) => {
        this.showMessage('Failed to resend OTP. Please try again.');
      }
    });
  }

  verifyOtp(email: string, otp: number): void {
    this.signupService.verifyOtp(email, otp).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.showMessage('OTP verified successfully');
          this.signupService.setOtpVerified(true);
          this.otpDialogRef?.close();
          this.router.navigate(['/ownerDetails']);
        } else {
          this.showMessage('Invalid OTP');
        }
      },
      error: (error) => {
        console.error('Error verifying OTP', error);
        this.showMessage('Error verifying OTP');
      }
    });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}