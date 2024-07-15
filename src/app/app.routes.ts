import { Routes } from '@angular/router';
import { LoginComponent } from './shared/widgets/login/login.component';
import { UserhomeComponent } from './pages/user/home/userhome/userhome.component';
import { UserLoginComponent } from './pages/user/user-login/user-login.component';
import { UserRegisterComponent } from './pages/user/user-register/user-register.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { UsersListComponent } from './pages/admin/users-list/users-list.component';
import { AuthGuard } from './core/guards/admin-auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AdminNoAuthGuard } from './core/guards/admin-no-auth.guard';
import { OwnerLoginComponent } from './pages/busOwner/owner-login/owner-login.component';
import { OwnerRegisterComponent } from './pages/busOwner/owner-register/owner-register.component';
import { OwnerOtpComponent } from './pages/busOwner/owner-otp/owner-otp.component';
import { OwnerDetailsComponent } from './pages/busOwner/owner-details/owner-details.component';
import { AgencyDetailsComponent } from './pages/busOwner/agency-details/agency-details.component';
import { ConfirmDetailsComponent } from './pages/busOwner/confirm-details/confirm-details.component';
import { DashboardComponent } from './pages/busOwner/dashboard/dashboard.component';

export const routes: Routes = [

    //---USERS ROUTES
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: UserhomeComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'userLogin',
        component: UserLoginComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'userRegister',
        component: UserRegisterComponent,
        canActivate: [NoAuthGuard]
    },

    //---BUS OWNER ROUTES
    {
        path: 'ownerLogin',
        component: OwnerLoginComponent,
    },
    {
        path: 'ownerRegister',
        component: OwnerRegisterComponent,
    },
    {
        path: 'ownerOtp',
        component: OwnerOtpComponent
    },
    {
        path: 'ownerDetails',
        component: OwnerDetailsComponent
    },
    {
        path: 'agencyDetails',
        component: AgencyDetailsComponent
    },
    {
        path: 'confirmation',
        component: ConfirmDetailsComponent
    },
    {
        path: 'ownerDashboard',
        component: DashboardComponent
    },

    //---ADMIN ROUTES
    {
        path: 'admin',
        component: AdminLoginComponent,
        canActivate: [AdminNoAuthGuard]
    },
    {
        path: 'admin',
        children: [
            { path: 'listUsers', component: UsersListComponent, canActivate: [AuthGuard] }
        ]
    }
];
