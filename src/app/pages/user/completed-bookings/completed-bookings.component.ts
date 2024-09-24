import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingsnavbarComponent } from '../bookingsnavbar/bookingsnavbar.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CompletedBookingService } from '../../../core/services/user/completed-booking.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { SidebarModule } from 'primeng/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { CustomPaginatorComponent } from '../../../shared/reusableComponents/custom-paginator/custom-paginator.component';

@Component({
  selector: 'app-completed-bookings',
  standalone: true,
  imports: [BookingsnavbarComponent, RouterModule, MatButtonModule, CommonModule, SkeletonModule, SidebarModule, MatIconModule, FooterComponent, UsernavComponent, ProfileSideBarComponent, CustomPaginatorComponent],
  templateUrl: './completed-bookings.component.html',
  styleUrl: './completed-bookings.component.css'
})
export class CompletedBookingsComponent implements OnInit {
  @ViewChild('sidebarContent') sidebarContent!: ElementRef;

  completedBookings: any[] = [];
  isLoading: boolean = true;
  sidebarVisible2: boolean = false;
  selectedBooking: any = null;

  pageSize = 5;
  pageIndex = 0;
  totalBookings = 5;

  constructor(private completedBookingService: CompletedBookingService, private router: Router) { }

  ngOnInit() {
    this.loadCompletedBookings();
  }

  loadCompletedBookings() {
    this.isLoading = true;
    this.completedBookingService.getAllCompletedBookings().subscribe({
      next: (response) => {
        this.completedBookings = response.bookings;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching completed bookings:', error);
        this.isLoading = false;
      }
    });
  }

  viewDetails(booking: any) {
    this.router.navigate(['/booking-details', booking.bookingId]);
  }

  onPageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCompletedBookings();
  }
}