import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LoginService } from './core/services/user/login.service';
import { provideToastr } from 'ngx-toastr'
import { provideAnimations } from '@angular/platform-browser/animations'
import { NzMessageService } from 'ng-zorro-antd/message';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    LoginService,
    NzMessageService,
    provideToastr() 
  ]
};
