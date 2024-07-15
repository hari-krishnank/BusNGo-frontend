import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminLoginService } from '../services/admin/admin-login.service';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
    const adminLoginService = inject(AdminLoginService);
    const token = adminLoginService.getToken();

    if (token) {
        console.log('token ind...', token);
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    console.log(req);
    return next(req);
};