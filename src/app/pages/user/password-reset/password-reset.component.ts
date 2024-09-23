import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from '../../../core/services/user/login.service';
import { noSpaceValidator, noWhitespaceValidator, passwordMatchValidator, strongPasswordValidator } from '../../../shared/validators/validators';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { resetPasswordField } from '../../../shared/configs/user/resetPassword.config';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [UsernavComponent, FormComponent, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {
  timestamp = new Date().getTime();
  resetForm: FormGroup;
  token: string | null = null;
  resetFields: FormField[] = resetPasswordField

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private loginService: LoginService, private message: NzMessageService, private snackBar: MatSnackBar) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required,  Validators.minLength(8), noWhitespaceValidator(), strongPasswordValidator(), noSpaceValidator()]],
      confirmPassword: ['', [Validators.required, noWhitespaceValidator(), noSpaceValidator()]]
    }, { validator: passwordMatchValidator('newPassword', 'confirmPassword') });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.showSnackBar('Invalid or missing reset token', 'Close', 'error-snackbar');
      this.router.navigate(['/userLogin']);
    }
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      const newPassword = this.resetForm.get('newPassword')?.value;
      this.loginService.resetPassword(this.token, newPassword).subscribe({
        next: (response) => {
          this.showSnackBar('Password reset successfully', 'Close', 'success-snackbar');
          this.router.navigate(['/userLogin']);
        },
        error: (error) => {
          this.showSnackBar('Failed to reset password. Please try again.', 'Close', 'error-snackbar');
        }
      });
    }
  }

  showSnackBar(message: string, action: string, className: string) {
    const config = new MatSnackBarConfig();
    config.duration = 4000;
    config.panelClass = [className];
    // config.horizontalPosition = 'right';
    config.verticalPosition = 'top';

    this.snackBar.open(message, action, config);
  }


  backToLogin() {
    this.router.navigate(['/userLogin'])
  }
}