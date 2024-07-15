import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { Router, RouterModule } from '@angular/router';
import { OtpComponent } from '../../user/otp/otp.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { signupService } from '../../../core/services/busOwner/signup.service';

@Component({
  selector: 'app-owner-register',
  standalone: true,
  imports: [OwnernavComponent, OwnerFooterComponent, OwnerFaqComponent, RouterModule, OtpComponent, FormsModule],
  templateUrl: './owner-register.component.html',
  styleUrl: './owner-register.component.css'
})
export class OwnerRegisterComponent {
  email: string = '';

  constructor(
    private signupService: signupService,
    private router: Router
  ) { }

  generateOtp(): void {
    if (this.email) {
      this.signupService.sendOtp(this.email).subscribe(
        () => {
          console.log('OTP sent successfully');
          this.signupService.setEmail(this.email);
          this.router.navigate(['/ownerOtp']);
        },
        error => {
          console.error('Error sending OTP', error);
        }
      );
    }
  }
}
