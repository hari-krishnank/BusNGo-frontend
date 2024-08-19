import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { LoginService } from "../services/user/login.service";

@Injectable({
    providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(): boolean {
        if (this.loginService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/userLogin'])
            return false;
        }
    }
}