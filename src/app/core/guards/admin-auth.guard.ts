import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AdminLoginService } from '../services/admin/admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private adminLoginService: AdminLoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('AuthGuard: Verifying token'); // Add this log
    return this.adminLoginService.verifyToken().pipe(
      map(() => {
        console.log('Token verified successfully'); // Add this log
        return true;
      }),
      catchError((error) => {
        console.error('Token verification failed:', error); // Add this log
        this.router.navigate(['/admin']);
        return of(false);
      })
    );
  }
}