import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/user/login.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(): boolean {
        if (this.loginService.isLoggedIn()) {
            this.router.navigate(['/home']);
            return false;
        }
        return true;
    }
}