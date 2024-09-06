import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AdminLoginService } from '../services/admin/admin-login.service';

export const AdminJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const adminLoginService = inject(AdminLoginService);
    const token = adminLoginService.getToken();

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req);
};