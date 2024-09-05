import { Component } from '@angular/core';
import { BookingsnavbarComponent } from '../bookingsnavbar/bookingsnavbar.component';

@Component({
  selector: 'app-cancelled-bookings',
  standalone: true,
  imports: [BookingsnavbarComponent],
  templateUrl: './cancelled-bookings.component.html',
  styleUrl: './cancelled-bookings.component.css'
})
export class CancelledBookingsComponent {

}
