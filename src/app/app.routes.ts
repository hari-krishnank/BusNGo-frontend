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
import { OwnerDetailsComponent } from './pages/busOwner/owner-details/owner-details.component';
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
import { TripComponent } from './pages/busOwner/trip/trip.component';
import { AssignedBusComponent } from './pages/busOwner/assigned-bus/assigned-bus.component';
import { AddRoutesComponent } from './pages/busOwner/add-routes/add-routes.component';
import { OwnerHomeComponent } from './pages/busOwner/owner-home/owner-home.component';
import { BusTicketsComponent } from './pages/user/bus-tickets/bus-tickets.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { HelpUsersComponent } from './pages/user/help-users/help-users.component';
import { UserAuthGuard } from './core/guards/auth.guard';
import { BookingSuccessComponent } from './pages/user/booking-success/booking-success.component';
import { CompletedBookingsComponent } from './pages/user/completed-bookings/completed-bookings.component';
import { CancelledBookingsComponent } from './pages/user/cancelled-bookings/cancelled-bookings.component';
import { PasswordResetComponent } from './pages/user/password-reset/password-reset.component';
import { BookingDetailsComponent } from './pages/user/booking-details/booking-details.component';
import { WalletComponent } from './pages/user/wallet/wallet.component';
import { CoTravellersComponent } from './pages/user/co-travellers/co-travellers.component';
import { StaffsComponent } from './pages/busOwner/staffs/staffs.component';
import { StaffHomeComponent } from './pages/staff/staff-home/staff-home.component';
import { StaffLoginComponent } from './pages/staff/staff-login/staff-login.component';
import { StaffDashboardComponent } from './pages/staff/staff-dashboard/staff-dashboard.component';
import { StaffNoAuthGuard } from './core/guards/staff-no-auth.guard';
import { StaffAuthGuard } from './core/guards/staff-auth.guard';

export const routes: Routes = [

    //---USERS ROUTES
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: UserhomeComponent },
    { path: 'login', component: LoginComponent, },
    { path: 'reset-password', component: PasswordResetComponent },
    { path: 'userLogin', component: UserLoginComponent, canActivate: [NoAuthGuard] },
    { path: 'userRegister', component: UserRegisterComponent, canActivate: [NoAuthGuard] },
    { path: 'searchresults', component: SearchResultsComponent },
    { path: 'busTickets/:bookingId', component: BusTicketsComponent },
    { path: 'userProfile', component: UserProfileComponent, canActivate: [UserAuthGuard] },
    { path: 'help', component: HelpUsersComponent },
    { path: 'booking-success', component: BookingSuccessComponent },
    { path: 'completed-bookings', component: CompletedBookingsComponent, canActivate: [UserAuthGuard] },
    { path: 'booking-details/:id', component: BookingDetailsComponent, canActivate: [UserAuthGuard] },
    { path: 'cancelled-bookings', component: CancelledBookingsComponent, canActivate: [UserAuthGuard] },
    { path: 'wallet', component: WalletComponent, canActivate: [UserAuthGuard] },
    // {
    //     path: 'wallet',
    //     component: WalletComponent,
    //     canActivate: [UserAuthGuard],
    //     children: [
    //         { path: '', component: WalletComponent },
    //         { path: 'success', component: WalletComponent }
    //     ]
    // },
    { path: 'CoTravellers', component: CoTravellersComponent, canActivate: [UserAuthGuard] },
    //---BUS OWNER ROUTES
    { path: 'ownerLogin', component: OwnerLoginComponent, canActivate: [OwnerNoAuthGuard] },
    { path: 'ownerRegister', component: OwnerRegisterComponent, canActivate: [OwnerNoAuthGuard] },
    { path: 'ownerDetails', component: OwnerDetailsComponent, canActivate: [OwnerNoAuthGuard] },
    { path: 'ownerHome', component: OwnerHomeComponent, canActivate: [OwnerAuthGuard] },
    { path: 'ownerDashboard', component: DashboardComponent, canActivate: [OwnerAuthGuard] },
    { path: 'counters', component: CountersComponent, canActivate: [OwnerAuthGuard] },
    { path: 'amenities', component: AmenitiesComponent, canActivate: [OwnerAuthGuard] },
    { path: 'seatlayout', component: SeatLayoutsComponent, canActivate: [OwnerAuthGuard] },
    { path: 'fleet', component: FleettypeComponent, canActivate: [OwnerAuthGuard] },
    { path: 'buses', component: BusesComponent, canActivate: [OwnerAuthGuard] },
    { path: 'routes', component: AddRoutesComponent, canActivate: [OwnerAuthGuard] },
    { path: 'schedule', component: ScheduleComponent, canActivate: [OwnerAuthGuard] },
    { path: 'trip', component: TripComponent, canActivate: [OwnerAuthGuard] },
    { path: 'assignBus', component: AssignedBusComponent, canActivate: [OwnerAuthGuard] },
    { path: 'manageStaffs', component: StaffsComponent, canActivate: [OwnerAuthGuard] },

    //---STAFF ROUTES
    { path: 'staffHome', component: StaffHomeComponent, canActivate: [StaffNoAuthGuard] },
    { path: 'staffLogin', component: StaffLoginComponent, canActivate: [StaffNoAuthGuard] },
    { path: 'staff/dashboard', component: StaffDashboardComponent, canActivate: [StaffAuthGuard] },

    //---ADMIN ROUTES
    { path: 'admin', component: AdminLoginComponent, canActivate: [AdminNoAuthGuard] },
    {
        path: 'admin', children:
            [
                { path: 'listUsers', component: UsersListComponent, canActivate: [AuthGuard] },
                { path: 'listOwners', component: BusOwnersListComponent, canActivate: [AuthGuard] },
            ]
    }
];