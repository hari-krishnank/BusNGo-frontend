import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/busOwner/signup/auth.service';

@Injectable({
  providedIn: 'root' 
})
export class OwnerAuthGuard implements CanActivate {
  constructor(private signupService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.signupService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/ownerLogin']);
      return false;
    }
  }
}