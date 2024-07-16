import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { MatIconModule } from '@angular/material/icon';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { signupService } from '../../../core/services/busOwner/signup.service';

@Component({
  selector: 'app-owner-login',
  standalone: true,
  imports: [OwnernavComponent, MatIconModule, OwnerFaqComponent, OwnerFooterComponent, RouterModule, FormsModule],
  templateUrl: './owner-login.component.html',
  styleUrl: './owner-login.component.css'
})
export class OwnerLoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private signupService: signupService, private router: Router) { }

  onSubmit() {
    this.signupService.login(this.loginData).subscribe(
      (response) => {
        // localStorage.setItem('ownertoken', response.owner_token);
        this.router.navigate(['/ownerDashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
