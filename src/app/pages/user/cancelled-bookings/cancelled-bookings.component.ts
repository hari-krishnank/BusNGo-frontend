import { Component } from '@angular/core';
import { BookingsnavbarComponent } from '../bookingsnavbar/bookingsnavbar.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';

@Component({
  selector: 'app-cancelled-bookings',
  standalone: true,
  imports: [BookingsnavbarComponent, FooterComponent,ProfileSideBarComponent, UsernavComponent],
  templateUrl: './cancelled-bookings.component.html',
  styleUrl: './cancelled-bookings.component.css'
})
export class CancelledBookingsComponent {

}
