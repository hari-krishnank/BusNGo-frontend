import { Component, OnInit } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { Router, RouterModule } from '@angular/router';
import { OwnerDetailsComponent } from '../owner-details/owner-details.component';
import { signupService } from '../../../core/services/busOwner/signup.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-owner-otp',
  standalone: true,
  imports: [OwnernavComponent, OwnerFooterComponent, OwnerFaqComponent, RouterModule, OwnerDetailsComponent, FormsModule],
  templateUrl: './owner-otp.component.html',
  styleUrl: './owner-otp.component.css'
})
export class OwnerOtpComponent implements OnInit {
  email: string = '';
  otp: string = '';

  constructor(private signUpService: signupService, private router: Router) { }

  ngOnInit() {
    this.email = this.signUpService.getEmail();
    if (!this.email) {
      this.router.navigate(['/ownerRegister']);
    }
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
}
