import { Component, OnInit } from '@angular/core';
import { CompletedBookingService } from '../../../core/services/user/completed-booking.service';
import { ActivatedRoute } from '@angular/router';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [UsernavComponent, FooterComponent, CommonModule, MatIconModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  booking: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private completedBookingService: CompletedBookingService
  ) { }

  ngOnInit() {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.loadBookingDetails(bookingId);
    }
  }

  loadBookingDetails(bookingId: string) {
    this.isLoading = true;
    this.completedBookingService.getBookingByBookingId(bookingId).subscribe({
      next: (response) => {
        this.booking = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching booking details:', error);
        this.isLoading = false;
      }
    });
  }
}
