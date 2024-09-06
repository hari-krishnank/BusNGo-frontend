import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/user/login.service';
import { catchError, throwError } from 'rxjs';

export const UserJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const loginService = inject(LoginService);
    const token = loginService.getToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    // return next(req);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (
                error.status === 401 && error.error?.message === 'Your account has been blocked. Please contact support.'
            ) { loginService.blockedLogout(); }
            return throwError(error);
        })
    );
};
// export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
//     const loginService = inject(LoginService);
//     const token = loginService.getToken();

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
//             ) { loginService.blockedLogout(); }
//             return throwError(error);
//         })
//     );
// };
