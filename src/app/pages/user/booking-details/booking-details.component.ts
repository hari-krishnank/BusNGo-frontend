import { Component, OnInit } from '@angular/core';
import { CompletedBookingService } from '../../../core/services/user/completed-booking.service';
import { ActivatedRoute } from '@angular/router';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CancellationPolicySidebarComponent } from '../cancellation-policy-sidebar/cancellation-policy-sidebar.component';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [UsernavComponent, CommonModule, MatIconModule, MatButtonModule, CancellationPolicySidebarComponent, FooterComponent,],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  booking: any;
  isLoading: boolean = true;
  sidebarVisible2: boolean = false;

  constructor(private route: ActivatedRoute, private completedBookingService: CompletedBookingService) { }

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

  getStatusColor(): string {
    switch (this.booking?.status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-600';
      case 'pending':
        return 'bg-orange-500';
      case 'cancelled':
        return 'bg-red-600'
      default:
        return 'bg-gray-500';
    }
  }

  openCancellationPolicy() {
    this.sidebarVisible2 = true;
  }
  
  onBookingCancelled() {
    if (this.booking && this.booking.bookingId) {
      this.loadBookingDetails(this.booking.bookingId);
    }
  }
}