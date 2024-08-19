import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { signupService } from '../services/busOwner/signup/signup.service';

@Injectable({
  providedIn: 'root' 
})
export class OwnerAuthGuard implements CanActivate {
  constructor(private signupService: signupService, private router: Router) {}

  canActivate(): boolean {
    if (this.signupService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/ownerLogin']);
      return false;
    }
  }
}