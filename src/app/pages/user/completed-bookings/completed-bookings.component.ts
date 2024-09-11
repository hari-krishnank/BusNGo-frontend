import { Component, OnInit } from '@angular/core';
import { BookingsnavbarComponent } from '../bookingsnavbar/bookingsnavbar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CompletedBookingService } from '../../../core/services/user/completed-booking.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-completed-bookings',
  standalone: true,
  imports: [BookingsnavbarComponent, RouterModule, MatButtonModule, CommonModule, SkeletonModule],
  templateUrl: './completed-bookings.component.html',
  styleUrl: './completed-bookings.component.css'
})
export class CompletedBookingsComponent implements OnInit {
  completedBookings: any[] = [];
  isLoading: boolean = true;

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
}