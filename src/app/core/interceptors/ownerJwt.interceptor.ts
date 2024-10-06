import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OwnerService } from '../services/busOwner/signup/owner.service';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/busOwner/signup/auth.service';

export const OwnerJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const SignupService = inject(AuthService);
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
            if (
                error.status === 401 && error.error?.message === 'Your account has been blocked. Please contact support.'
            ) { SignupService.blockedLogout(); }
            return throwError(error);
        })
    )
};