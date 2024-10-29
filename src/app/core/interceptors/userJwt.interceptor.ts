import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/user/login.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { ILoginResponse } from '../models/user/login.interface';

export const UserJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const loginService = inject(LoginService);
    const token = loginService.getToken();

    if (req.url.includes('refresh') || req.url.includes('login')) {
        return next(req);
    }

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
                    loginService.blockedLogout();
                    return throwError(() => error);
                }

                return loginService.refreshToken().pipe(
                    switchMap((response: ILoginResponse) => {
                        const newReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${response.access_token}`
                            }
                        });
                        return next(newReq);
                    }),
                    catchError((refreshError) => {
                        loginService.logout();
                        return throwError(() => refreshError);
                    })
                );
            }
            return throwError(() => error);
        })
    );
};