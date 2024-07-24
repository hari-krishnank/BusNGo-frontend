import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IBenefit, IGridItem } from '../../../../core/models/user/home.interface';

@Component({
  selector: 'app-bus-benefits',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './bus-benefits.component.html',
  styleUrl: './bus-benefits.component.css'
})
export class BusBenefitsComponent {

  showFullDescription: boolean = false;

  headerText = 'Book Bus Tickets Online';

  mainDescription = `BusNGo is India's largest brand for online bus ticket booking and offers an easy-to-use online bus and train ticket booking; with over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking, BusNGo makes road journeys super convenient for travellers. A leading platform for booking bus tickets, BusNGo has been the leader in online bus booking over the past 17 years across thousands of cities and lakhs of routes in India.`;

  fullDescription = `Booking a bus ticket online on the BusNGo app or website is very simple. You can download the BusNGo app or visit redbus.in and enter your source, destination & travel date to check the top-rated bus services available. You can then compare bus prices, user ratings & amenities, select your preferred seat, boarding & dropping points and pay using multiple payment options like UPI, debit or credit card, net banking and more. With BusNGo, get assured safe & secure payment methods and guaranteed travel with the best service. Our customer support team is available 24/7 to assist you with any queries or issues you may face during your booking process or journey.`;

  dealsHeader = 'Bus Booking Deals on BusNGo';

  dealsDescription = `Don't miss out on these incredible offers, book your bus tickets now and travel with convenience and affordability. Hurry, grab the best bus booking deals before they're gone!`;

  bookingData = {
    deals: 3373,
    busOperators: 1480,
    routes: 162128
  };

  mainTitle = 'Benefit of booking bus with BusNGo';

  benefits: IBenefit[] = [
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'On Time',
      description: 'Punctual arrivals on 95% trips'
    },
    {
      icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
      title: 'Friendly Staff',
      description: 'Always ready to help'
    },
    {
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      title: 'Top Rated',
      description: 'Buses with 4+ star rating'
    }
  ];

  gridItems: IGridItem[] = [
    {
      imageSrc: 'assets/User/bus.png',
      title: 'Safe and Secure',
      description: 'Book from a wide variety of buses, including AC, Non-AC, Deluxe, Volvo and more.'
    },
    {
      imageSrc: 'assets/User/wallet.png',
      title: 'Lowest ticket charges',
      description: 'Grab huge discounts and cashbacks on your bus booking with BusNGo.'
    },
    {
      imageSrc: 'assets/User/wallet.png',
      title: 'Lowest ticket charges',
      description: 'Grab huge discounts and cashbacks on your bus booking with BusNGo.'
    },
    {
      imageSrc: 'assets/User/users.png',
      title: "Customer's trust",
      description: "We have tied up with India's best bus operators to make travel easy for our customers."
    }
  ];

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
}
