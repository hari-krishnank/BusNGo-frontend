import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminLoginService } from '../services/admin/admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminNoAuthGuard implements CanActivate {
  constructor(private adminLoginService: AdminLoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.adminLoginService.getToken()) {
      this.router.navigate(['/admin/listUsers']);
      return false;
    }
    return true;
  }
}   