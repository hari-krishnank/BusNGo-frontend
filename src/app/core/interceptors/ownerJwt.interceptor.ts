// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { signupService } from '../services/busOwner/signup/signup.service';
// import { catchError, throwError } from 'rxjs';

// export const OwnerJwtInterceptor: HttpInterceptorFn = (req, next) => {
//     const SignupService = inject(signupService);
//     const token = SignupService.getToken();

//     if (token) {
//         req = req.clone({
//             setHeaders: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//     }
//     return next(req).pipe(
//         catchError((error: HttpErrorResponse) => {
//             if (
//                 error.status === 401 && error.error?.message === 'Your account has been blocked. Please contact support.'
//             ) { SignupService.logout(); }
//             return throwError(error);
//         })
//     )
// };

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { signupService } from '../services/busOwner/signup/signup.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const OwnerJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const SignupService = inject(signupService);
    const snackBar = inject(MatSnackBar);
    const token = SignupService.getToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                if (error.error?.message === 'Your account has been blocked. Please contact support.') {
                    showErrorMessage(snackBar, 'Your account has been blocked. Please contact support.');
                    SignupService.logout();
                } else {
                    showErrorMessage(snackBar, 'Session expired. Please log in again.');
                    SignupService.logout();
                }
            }
            return throwError(error);
        })
    );
};

function showErrorMessage(snackBar: MatSnackBar, message: string): void {
    snackBar.open(message, 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    });
}