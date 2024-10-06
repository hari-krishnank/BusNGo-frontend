import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { MatIconModule } from '@angular/material/icon';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { ownerLoginFields } from '../../../shared/configs/busOwner/loginForm-config';
import { MatButtonModule } from '@angular/material/button';
import { noWhitespaceValidator, strongPasswordValidator } from '../../../shared/validators/validators';
import { AuthService } from '../../../core/services/busOwner/signup/auth.service';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-owner-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, FormComponent, OwnernavComponent, OwnerFaqComponent, OwnerFooterComponent],
  templateUrl: './owner-login.component.html',
  styleUrl: './owner-login.component.css'
})
export class OwnerLoginComponent {
  ownerLoginForm!: FormGroup;
  ownerLoginFields: FormField[] = ownerLoginFields;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private message: MessageService) {
    this.ownerLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, noWhitespaceValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator()]]
    });
  }

  onSubmit() {
    if (this.ownerLoginForm.invalid) {
      return;
    }
    this.authService.login(this.ownerLoginForm.value).subscribe(
      (response) => {
        this.router.navigate(['/ownerHome']);
      },
      (error) => {
        console.error('Login failed', error);
        if (error.message === 'ACCOUNT_BLOCKED') {
          this.message.showErrorMessage('Your account has been blocked. Please contact support.');
        } else if (error.message === 'INVALID_CREDENTIALS') {
          this.message.showErrorMessage('Invalid email or password.');
        } else {
          this.message.showErrorMessage('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }
}