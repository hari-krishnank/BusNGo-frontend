import { Component, OnInit } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { MatIconModule } from '@angular/material/icon';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { signupService } from '../../../core/services/busOwner/signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-login',
  standalone: true,
  imports: [OwnernavComponent, MatIconModule, OwnerFaqComponent, OwnerFooterComponent, RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './owner-login.component.html',
  styleUrl: './owner-login.component.css'
})
export class OwnerLoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: signupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.errorMessage = null; 

    if (this.loginForm.invalid) {
      return;
    }

    this.signupService.login(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['/ownerDashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
