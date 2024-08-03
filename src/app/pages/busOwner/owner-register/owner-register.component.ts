import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { Router, RouterModule } from '@angular/router';
import { OtpComponent } from '../../user/otp/otp.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { signupService } from '../../../core/services/busOwner/signup/signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-register',
  standalone: true,
  imports: [OwnernavComponent, OwnerFooterComponent, OwnerFaqComponent, RouterModule, OtpComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './owner-register.component.html',
  styleUrl: './owner-register.component.css'
})
export class OwnerRegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: signupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get formControls() { return this.registerForm.controls; }

  generateOtp(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      this.signupService.sendOtp(email).subscribe(
        () => {
          console.log('OTP sent successfully');
          this.signupService.setEmail(email);
          this.router.navigate(['/ownerOtp']);
        },
        error => {
          console.error('Error sending OTP', error);
        }
      );
    }
  }
}
