import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionManagementService } from '../../shared/services/auth.service';
import { UserJwtInterceptor } from './userJwt.interceptor';
import { OwnerJwtInterceptor } from './ownerJwt.interceptor';
import { AdminJwtInterceptor } from './adminJwt.interceptor';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
    const sessionManagementService = inject(SessionManagementService);
    const currentUserType = sessionManagementService.getCurrentUserType();

    switch (currentUserType) {
        case 'user':
            return UserJwtInterceptor(req, next);
        case 'owner':
            return OwnerJwtInterceptor(req, next);
        case 'admin':
            return AdminJwtInterceptor(req, next);
        default:
            return next(req);
    }
};