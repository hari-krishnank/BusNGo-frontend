import { inject } from '@angular/core';
import { StaffAuthService } from '../services/staffs/staffAuth.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const StaffJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const StaffLoginService = inject(StaffAuthService);
    const token = StaffLoginService.getToken();
    
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(req);
}