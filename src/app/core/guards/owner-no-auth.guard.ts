import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/user/login.service';
import { signupService } from '../services/busOwner/signup/signup.service';

@Injectable({
    providedIn: 'root'
})
export class OwnerNoAuthGuard implements CanActivate {
    constructor(private signupService: signupService, private router: Router) { }

    canActivate(): boolean {
        if (this.signupService.isLoggedIn()) {
            this.router.navigate(['/ownerDashboard']);
            return false;
        }
        return true;
    }
}