import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StaffAuthService } from '../services/staffs/staffAuth.service';

@Injectable({
    providedIn: 'root'
})
export class StaffAuthGuard implements CanActivate {
    constructor(private staffService: StaffAuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.staffService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/staffLogin']);
            return false;
        }
    }
}