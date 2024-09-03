import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { PendingBookingService } from '../../../core/services/user/pending-booking.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaypalPaymentComponent } from '../paypal-payment/paypal-payment.component';
import { StripePaymentComponent } from '../stripe-payment/stripe-payment.component';
import { StripeService } from '../../../core/services/user/stripe.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-bus-tickets',
  standalone: true,
  imports: [CommonModule, UsernavComponent, PaypalPaymentComponent, StripePaymentComponent, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, FooterComponent],
  templateUrl: './bus-tickets.component.html',
  styleUrl: './bus-tickets.component.css'
})
export class BusTicketsComponent implements OnInit {
  pendingBooking: any;
  priceBreakdown!: { baseFare: number; tax: number; convenienceFee: number; totalAmount: number; };
  private stripePromise: Promise<Stripe | null>;

  constructor(private route: ActivatedRoute, private pendingBookingService: PendingBookingService, private stripeService: StripeService) {
    this.stripePromise = loadStripe(environment.STRIPE_KEY);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const bookingId = params.get('bookingId');
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

    this.priceBreakdown = { baseFare, tax, convenienceFee, totalAmount };
  }

  async pay() {
    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error('Stripe failed to load');
      return;
    }

    this.stripeService.createCheckoutSession(this.priceBreakdown.totalAmount).subscribe(
      async (session) => {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id
        });

        if (result.error) {
          console.error('Error:', result.error);
        }
      },
      (error) => {
        console.error('Error creating checkout session:', error);
      }
    );
  }

}