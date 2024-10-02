import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { MatIconModule } from '@angular/material/icon';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signupService } from '../../../core/services/busOwner/signup/signup.service';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { ownerLoginFields } from '../../../shared/configs/busOwner/loginForm-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(private formBuilder: FormBuilder, private signupService: signupService, private router: Router, private snackBar: MatSnackBar) {
    this.ownerLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  } 

  onSubmit(formValue: any) {
    if (this.ownerLoginForm.invalid) {
      return;
    }

    this.signupService.login(this.ownerLoginForm.value).subscribe(
      (response) => {
        this.router.navigate(['/ownerHome']);
      },
      (error) => {
        this.snackBar.open('Invalid email or password', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );
  }
}