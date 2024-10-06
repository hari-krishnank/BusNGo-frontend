import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { Router, RouterModule } from '@angular/router';
import { OtpComponent } from '../../user/otp/otp.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { ownerRegisterFields } from '../../../shared/configs/busOwner/registerForm-config';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { ownerOtpFields } from '../../../shared/configs/busOwner/otpForm-config';
import { noWhitespaceValidator } from '../../../shared/validators/validators';
import { OtpService } from '../../../core/services/busOwner/signup/otp.service';

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
  otpFields: FormField[] = ownerOtpFields;

  constructor(private formBuilder: FormBuilder, private router: Router, private otpService: OtpService) {
    this.ownerRegisterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]]
    });
  }

  generateOtp(): void {
    if (this.ownerRegisterForm.valid) {
      const email = this.ownerRegisterForm.get('email')?.value;
      this.otpService.sendOtp(email).subscribe({
        next: () => this.handleOtpSent(email),
        error: (error) => console.error('Error sending OTP', error)
      });
    }
  }

  private handleOtpSent(email: string): void {
    this.otpService.openOtpModal(email, this.otpFields).subscribe({
      next: (result) => {
        if (result) {
          this.verifyOtp(email, parseInt(result.otp, 10));
        }
      }
    });
  }

  private verifyOtp(email: string, otp: number): void {
    this.otpService.verifyOtp(email, otp).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.otpService.closeOtpModal();
          this.router.navigate(['/ownerDetails']);
        }
      },
      error: (error) => console.error('Error verifying OTP', error)
    });
  }
}