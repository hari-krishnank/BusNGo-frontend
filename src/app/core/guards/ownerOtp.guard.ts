// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { signupService } from '../services/busOwner/signup/signup.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class OwnerOtpGuard implements CanActivate {
//     constructor(private signupService: signupService, private router: Router) { }

//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//         const email = this.signupService.getEmail();

//         if (email) {
//             return true;
//         } else {
//             this.router.navigate(['/ownerRegister']);
//             return false;
//         }
//     }
// }


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { signupService } from '../services/busOwner/signup/signup.service';

@Injectable({
    providedIn: 'root'
})
export class OwnerOtpGuard implements CanActivate {
    constructor(private signupService: signupService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const email = this.signupService.getEmail();
        const otpVerified = this.signupService.isOtpVerified();

        if (email && !otpVerified) {
            return true;
        } else if (otpVerified) {
            this.router.navigate(['/ownerDetails']);
            return false;
        } else {
            this.router.navigate(['/ownerRegister']);
            return false;
        }
    }
}