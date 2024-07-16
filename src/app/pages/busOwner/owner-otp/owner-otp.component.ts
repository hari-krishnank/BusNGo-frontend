import { Component, OnInit } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { Router, RouterModule } from '@angular/router';
import { OwnerDetailsComponent } from '../owner-details/owner-details.component';
import { signupService } from '../../../core/services/busOwner/signup.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-otp',
  standalone: true,
  imports: [OwnernavComponent, OwnerFooterComponent, OwnerFaqComponent, RouterModule, OwnerDetailsComponent, FormsModule, CommonModule],
  templateUrl: './owner-otp.component.html',
  styleUrl: './owner-otp.component.css'
})
export class OwnerOtpComponent implements OnInit {
  email: string = '';
  otp: string = '';
  remainingTime: number = 60;
  canResend: boolean = false;
  timer: any;

  constructor(private signUpService: signupService, private router: Router) { }

  ngOnInit() {
    this.email = this.signUpService.getEmail();
    if (!this.email) {
      this.router.navigate(['/ownerRegister']);
    }
    this.startTimer();
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

  verifyOtp(): void {
    console.log('button clicks....');
    if (this.email && this.otp) {
      console.log(this.otp);

      this.signUpService.verifyOtp(this.email, Number(this.otp)).subscribe(
        isValid => {
          if (isValid) {
            console.log(isValid);
            console.log('OTP verified successfully');
            this.router.navigate(['/ownerDetails']);
          } else {
            console.error('Invalid OTP');
          }
        },
        error => {
          console.error('Error verifying OTP', error);
        }
      );
    }
  }

  resendOtp(): void {
    if (this.canResend) {
      this.signUpService.resendOtp(this.email).subscribe(
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

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
