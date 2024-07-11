import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { UserhomeComponent } from './components/user/home/userhome/userhome.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:UserhomeComponent
    },
    { path: 'login', component: LoginComponent },
    { path: 'userLogin', component: UserLoginComponent },
    { path: 'userRegister', component: UserRegisterComponent },
];
