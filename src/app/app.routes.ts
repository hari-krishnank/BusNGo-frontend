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
import { OwnerAuthGuard } from './core/guards/ownerauth.guard';
import { BusOwnersListComponent } from './pages/admin/bus-owners-list/bus-owners-list.component';
import { OwnerNoAuthGuard } from './core/guards/owner-no-auth.guard';
import { SearchResultsComponent } from './pages/user/search-results/search-results.component';
import { CountersComponent } from './pages/busOwner/counters/counters.component';
import { AmenitiesComponent } from './pages/busOwner/amenities/amenities.component';
import { SeatLayoutsComponent } from './pages/busOwner/seat-layouts/seat-layouts.component';
import { FleettypeComponent } from './pages/busOwner/fleettype/fleettype.component';
import { BusesComponent } from './pages/busOwner/buses/buses.component';
import { ScheduleComponent } from './pages/busOwner/schedule/schedule.component';
import { TicketPriceComponent } from './pages/busOwner/ticket-price/ticket-price.component';
import { TripComponent } from './pages/busOwner/trip/trip.component';
import { AssignedBusComponent } from './pages/busOwner/assigned-bus/assigned-bus.component';
import { AddRoutesComponent } from './pages/busOwner/add-routes/add-routes.component';

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
    {
        path: 'searchresults',
        component: SearchResultsComponent
    },

    //---BUS OWNER ROUTES
    {
        path: 'ownerLogin',
        component: OwnerLoginComponent,
        canActivate:[OwnerNoAuthGuard]
    },
    {
        path: 'ownerRegister',
        component: OwnerRegisterComponent,
        canActivate:[OwnerNoAuthGuard]
    },
    {
        path: 'ownerOtp',
        component: OwnerOtpComponent,
        canActivate:[OwnerNoAuthGuard]
    },
    {
        path: 'ownerDetails',
        component: OwnerDetailsComponent,
        canActivate:[OwnerNoAuthGuard]
    },
    {
        path: 'agencyDetails',
        component: AgencyDetailsComponent,
        canActivate:[OwnerNoAuthGuard]
    },
    {
        path: 'confirmation',
        component: ConfirmDetailsComponent,
        canActivate:[OwnerNoAuthGuard]
    },
    {
        path: 'ownerDashboard',
        component: DashboardComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'counters',
        component: CountersComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'amenities',
        component: AmenitiesComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'seatlayout',
        component: SeatLayoutsComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'fleet',
        component: FleettypeComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'buses',
        component: BusesComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'routes',
        component: AddRoutesComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'ticketPrice',
        component: TicketPriceComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'trip',
        component: TripComponent,
        canActivate: [OwnerAuthGuard]
    },
    {
        path: 'assignBus',
        component: AssignedBusComponent,
        canActivate: [OwnerAuthGuard]
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
            { path: 'listUsers', component: UsersListComponent, canActivate: [AuthGuard] },
            { path: 'listOwners', component: BusOwnersListComponent, canActivate: [AuthGuard] },
        ]
    }
];
