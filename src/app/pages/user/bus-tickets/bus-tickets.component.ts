import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { PendingBookingService } from '../../../core/services/user/pending-booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StripeService } from '../../../core/services/user/stripe.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bus-tickets',
  standalone: true,
  imports: [CommonModule, UsernavComponent, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, FooterComponent],
  templateUrl: './bus-tickets.component.html',
  styleUrl: './bus-tickets.component.css'
})
export class BusTicketsComponent implements OnInit {

  pendingBooking: any;
  priceBreakdown!: { baseFare: number; tax: number; convenienceFee: number; totalAmount: number; };
  private stripePromise: Promise<Stripe | null>;
  selectedPaymentMethod: 'stripe' | 'wallet' = 'stripe';
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private pendingBookingService: PendingBookingService, private stripeService: StripeService, private router: Router, private snackBar: MatSnackBar) {
    this.stripePromise = loadStripe(environment.STRIPE_KEY);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bookingId = params.get('bookingId');
      if (bookingId) {
        this.loadPendingBooking(bookingId);
      }
    });

    // Check for Stripe redirect
    this.route.queryParams.subscribe(params => {
      if (params['session_id']) {
        this.handleStripeRedirect(params['session_id']);
      }
    });
  }

  loadPendingBooking(bookingId: string) {
    this.isLoading = true;
    this.pendingBookingService.getPendingBooking(bookingId).subscribe(
      data => {
        this.pendingBooking = data;
        this.calculatePriceBreakdown();
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching pending booking:', error);
        this.snackBar.open('Error loading booking details. Please try again.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }

  calculatePriceBreakdown() {
    const baseFare = this.pendingBooking.totalTicketPrice;
    const tax = Math.round(baseFare * 0.05);
    const convenienceFee = 13;
    const totalAmount = baseFare + tax + convenienceFee;

    this.priceBreakdown = { baseFare, tax, convenienceFee, totalAmount };
  }

  onPaymentMethodChange(method: 'stripe' | 'wallet') {
    this.selectedPaymentMethod = method;
  }

  async pay() {
    this.isLoading = true;
    if (this.selectedPaymentMethod === 'stripe') {
      await this.payWithStripe();
    } else if (this.selectedPaymentMethod === 'wallet') {
      this.payWithWallet();
    }
    this.isLoading = false;
  }

  private async payWithStripe() {
    const stripe = await this.stripePromise;
    if (!stripe) {
      this.snackBar.open('Stripe failed to load. Please try again later.', 'Close', { duration: 3000 });
      return;
    }

    const bookingDetails = {
      amount: this.priceBreakdown.totalAmount,
      bookingId: this.pendingBooking._id,
      tripDetails: {
        from: this.pendingBooking.tripId.startFrom.city,
        to: this.pendingBooking.tripId.endTo.city,
        departureTime: this.pendingBooking.routeId.schedule.startFrom,
        arrivalTime: this.pendingBooking.routeId.schedule.end,
        busName: this.pendingBooking.busId.name,
        seatNumbers: this.pendingBooking.selectedSeatNumbers.join(', ')
      },
      travellers: this.pendingBooking.travellersDetails.map((t: { firstName: any; lastName: any; }) => `${t.firstName} ${t.lastName}`).join(', ')
    };

    this.stripeService.createCheckoutSession(bookingDetails).subscribe(
      async (session) => {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id
        });

        if (result.error) {
          console.error('Error:', result.error);
          this.snackBar.open('Error initiating payment. Please try again.', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        console.error('Error creating checkout session:', error);
        this.snackBar.open('Error creating payment session. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }

  private payWithWallet() {
    this.snackBar.open('Wallet payment not implemented yet.', 'Close', { duration: 3000 });
  }

  private handleStripeRedirect(sessionId: string) {
    this.isLoading = true;
    this.stripeService.verifySession(sessionId).subscribe(
      (response) => {
        if (response.status === 'paid') {
          this.router.navigate(['/booking-success'], { queryParams: { bookingId: this.pendingBooking._id } });
        } else {
          console.error('Payment was not successful');
          this.snackBar.open('Payment was not successful. Please try again.', 'Close', { duration: 3000 });
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error verifying session:', error);
        this.snackBar.open('Error verifying payment. Please contact support.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }
}