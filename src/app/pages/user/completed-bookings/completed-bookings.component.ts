import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingsnavbarComponent } from '../bookingsnavbar/bookingsnavbar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CompletedBookingService } from '../../../core/services/user/completed-booking.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { SidebarModule } from 'primeng/sidebar';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';

@Component({
  selector: 'app-completed-bookings',
  standalone: true,
  imports: [BookingsnavbarComponent, RouterModule, MatButtonModule, CommonModule, SkeletonModule, SidebarModule, MatIconModule, FooterComponent],
  templateUrl: './completed-bookings.component.html',
  styleUrl: './completed-bookings.component.css'
})
export class CompletedBookingsComponent implements OnInit {
  @ViewChild('sidebarContent') sidebarContent!: ElementRef;

  completedBookings: any[] = [];
  isLoading: boolean = true;
  sidebarVisible2: boolean = false;
  selectedBooking: any = null;

  constructor(private completedBookingService: CompletedBookingService) { }

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
    this.selectedBooking = booking;
    this.sidebarVisible2 = true;
  }

}