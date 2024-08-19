import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SeatPreviewComponent } from '../../busOwner/seat-preview/seat-preview.component';
import { Router } from '@angular/router';
import { SeatBookingComponent } from '../seat-booking/seat-booking.component';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, MatButtonModule, SeatPreviewComponent, SeatBookingComponent],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css'
})
export class SeatSelectionComponent {
  @Input() trip: any;
  @Output() seatsSelected = new EventEmitter<string[]>();
  @Output() bookSeatsClicked = new EventEmitter<any>();
  @Output() toggleSidebar = new EventEmitter<void>();
  @ViewChild(SeatBookingComponent) seatBookingComponent!: SeatBookingComponent;

  constructor(private router: Router) { }

  getSeatLayout(trip: any): any {
    return trip.fleetType.seatLayout;
  }

  onSeatsSelected(tripName: string, selectedSeats: string[]) {
    this.seatsSelected.emit(selectedSeats);
  }

  bookSeats() {
    this.bookSeatsClicked.emit(this.trip);
    if (this.seatBookingComponent) {
      this.seatBookingComponent.toggleSidebar();
    }
  }
} 