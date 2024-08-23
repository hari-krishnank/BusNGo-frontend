import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { PendingBookingService } from '../../../core/services/user/pending-booking.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus-tickets',
  standalone: true,
  imports: [CommonModule, UsernavComponent, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, FooterComponent],
  templateUrl: './bus-tickets.component.html',
  styleUrl: './bus-tickets.component.css'
})
export class BusTicketsComponent implements OnInit {
  pendingBooking: any;
  priceBreakdown!: {
    baseFare: number;
    tax: number;
    convenienceFee: number;
    totalAmount: number;
  };

  constructor(private route: ActivatedRoute, private pendingBookingService: PendingBookingService) { }

  ngOnInit() {
    console.log('BusTicketsComponent initialized');
    this.route.paramMap.subscribe(params => {
      const bookingId = params.get('bookingId');
      console.log('Extracted bookingId:', bookingId);
      if (bookingId) {
        this.loadPendingBooking(bookingId);
      }
    });
  }

  loadPendingBooking(bookingId: string) {
    this.pendingBookingService.getPendingBooking(bookingId).subscribe(
      data => {
        this.pendingBooking = data;
        this.calculatePriceBreakdown();
      },
      error => {
        console.error('Error fetching pending booking:', error);
      }
    );
  }

  calculatePriceBreakdown() {
    const baseFare = this.pendingBooking.totalTicketPrice;
    const tax = Math.round(baseFare * 0.05);
    const convenienceFee = 13;
    const totalAmount = baseFare + tax + convenienceFee;

    this.priceBreakdown = {
      baseFare,
      tax,
      convenienceFee,
      totalAmount
    };
  }
}