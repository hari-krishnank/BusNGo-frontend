import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StaffAuthService } from '../services/staffs/staffAuth.service';

@Injectable({
    providedIn: 'root'
})
export class StaffNoAuthGuard implements CanActivate {
    constructor(private staffService: StaffAuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.staffService.isLoggedIn()) {
            this.router.navigate(['/staffDashboard']);
            return false;
        }
        return true;
    }
}