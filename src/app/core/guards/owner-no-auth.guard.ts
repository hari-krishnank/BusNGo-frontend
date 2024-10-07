import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/user/login.service';
import { AuthService } from '../services/busOwner/signup/auth.service';

@Injectable({
    providedIn: 'root'
})
export class OwnerNoAuthGuard implements CanActivate {
    constructor(private signupService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.signupService.isLoggedIn()) {
            this.router.navigate(['/ownerHome']);
            return false;
        }
        return true;
    }
}