import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IFAQ } from '../../../../models/user/home';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {

  faqs: IFAQ[] = [
    {
      question: 'Can I track the location of my booked bus online?',
      answer: 'Yes, BusNGo offers real-time tracking of your booked bus. You can easily track the location of your bus through the BusNGo app or website, ensuring you are updated with its current status and expected arrival time.',
      isOpen: false
    },
    {
      question: 'What are the advantages of purchasing a bus ticket with BusNGo?',
      answer: 'Purchasing a bus ticket with BusNGo comes with numerous advantages. With access to over 3500+ bus operators and a vast network of routes, you have a wide selection of options to choose from. The convenience of booking tickets online at any time and from any location saves you time and effort. BusNGo also offers various deals and discounts, making your travel more affordable. You can pay securely using multiple payment methods, including UPI, debit/credit cards, and net banking. Additionally, user ratings and reviews help you make informed decisions, and the easy cancellation and refund policies add to the hassle-free experience.',
      isOpen: false
    },
    {
      question: 'Why book bus tickets online on BusNGo?',
      answer: 'Booking bus tickets online on BusNGo is highly convenient and efficient. It saves you time and effort as you can compare prices, select seats, and make secure payments from the comfort of your home. Additionally, you can access special online discounts and offers, making it a cost-effective option.',
      isOpen: false
    },
    {
      question: 'Do I need to create an account on the BusNGo site to book my bus ticket?',
      answer: 'While creating an account on BusNGo is recommended for a more personalized experience and to keep track of your bookings easily, it is not mandatory. You can book tickets as a guest user as well.',
      isOpen: false
    },
    {
      question: 'Does bus booking online cost me more?',
      answer: 'No, booking bus tickets online with BusNGo does not cost you more. In fact, you might find it cheaper due to the various discounts and promotional offers available exclusively for online bookings.',
      isOpen: false
    },
    {
      question: 'How can I get the discounts on the bus booking?',
      answer: 'To avail discounts on bus bookings, you can use promo codes and coupons available on the BusNGo website or app. Additionally, look out for seasonal promotions and festive discounts. Joining loyalty programs can also provide you with additional discounts and rewards. Partner deals with banks or e-wallets can offer further savings on your bookings.',
      isOpen: false
    },
    {
      question: "What's New in Bus Booking on BusNGo?",
      answer: 'BusNGo has introduced several new features to enhance your booking experience. The real-time tracking of buses has been improved for better accuracy and updates. The network has been expanded with new routes and additional bus operators. The app interface has been updated to provide a more user-friendly experience. New payment options, including various e-wallets, have been added for greater flexibility. Additionally, new loyalty and reward programs have been introduced for frequent users, offering more benefits and incentives.',
      isOpen: false
    },
  ];

  toggleFAQ(faq: IFAQ) {
    faq.isOpen = !faq.isOpen;
  }
}