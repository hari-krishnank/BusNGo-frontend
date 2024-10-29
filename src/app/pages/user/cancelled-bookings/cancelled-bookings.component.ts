import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingsnavbarComponent } from '../bookingsnavbar/bookingsnavbar.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { CustomPaginatorComponent } from '../../../shared/reusableComponents/custom-paginator/custom-paginator.component';
import { CommonModule } from '@angular/common';
import { CancelledBookingService } from '../../../core/services/user/cancelled-booking.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cancelled-bookings',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatPaginatorModule, MatButtonModule,MatSelectModule, UsernavComponent, ProfileSideBarComponent, BookingsnavbarComponent, CustomPaginatorComponent, FooterComponent],
  templateUrl: './cancelled-bookings.component.html', 
  styleUrl: './cancelled-bookings.component.css'
})
export class CancelledBookingsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cancelledBookings: any[] = [];
  isLoading: boolean = true;
  selectedBooking: any = null;

  pageSize = 5;
  pageIndex = 0;
  totalBookings = 0;
  sortOption = '-cancelledAt';

  constructor(private cancelledBookingService: CancelledBookingService, private router: Router) { }

  ngOnInit() {
    this.loadCancelledBookings();
  }

  loadCancelledBookings() {
    this.isLoading = true;
    this.cancelledBookingService.getAllCancelledBookings(this.pageIndex + 1, this.pageSize, this.sortOption).subscribe({
      next: (response) => {
        this.cancelledBookings = response.bookings;
        this.totalBookings = response.count;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching cancelled bookings:', error);
        this.isLoading = false;
      }
    });
  }

  viewDetails(booking: any) {
    this.router.navigate(['/booking-details', booking.bookingId]);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCancelledBookings();
  }

  onSortChange() {
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.loadCancelledBookings();
  }
}