import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { signupService } from '../services/busOwner/signup/signup.service';

export const OwnerJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const SignupService = inject(signupService);
    const token = SignupService.getToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req);
};