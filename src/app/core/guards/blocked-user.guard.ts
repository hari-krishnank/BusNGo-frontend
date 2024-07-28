import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginService } from '../services/user/login.service';

@Injectable({
    providedIn: 'root'
})
export class BlockedUserGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.loginService.checkUserBlockStatus().pipe(
            map(isBlocked => {
                if (isBlocked) {
                    this.loginService.logout();
                    this.router.navigate(['/userLogin']);
                    return false;
                }
                return true;
            }),
            catchError(() => {
                this.router.navigate(['/userLogin']);
                return of(false);
            })
        );
    }
}