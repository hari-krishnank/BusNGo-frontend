// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AdminLoginService } from '../services/admin/admin-login.service';

// export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
//     const adminLoginService = inject(AdminLoginService);
//     const token = adminLoginService.getToken();

//     if (token) {
//         console.log('token ind...', token);
//         req = req.clone({
//             setHeaders: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//     }
//     console.log(req);
//     return next(req);
// };


import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/user/login.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
    const loginService = inject(LoginService);
    const token = loginService.getToken();

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
            ) { loginService.blockedLogout(); }
            return throwError(error);
        })
    );
};
