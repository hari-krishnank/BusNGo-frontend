import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OffersComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) { }

  offers = [
    {
      title: 'New User Offer on',
      subtitle: 'First Bus',
      code: 'BNG111',
      description: 'Grab Discount Up to Rs. 250 on First Bus Booking with BusNGo',
      validTill: '30th June, 2024',
      backgroundImage: 'assets/User/img5.webp'
    },
    {
      title: 'Book Bus & get',
      subtitle: 'Up to INR 500 Off',
      code: 'BNG123',
      description: 'Enjoy Bus Tickets to Different Destinations At A Discount up to Rs.500',
      validTill: '30th June, 2024',
      backgroundImage: 'assets/User/img1.png'
    },
    {
      title: 'Book Bus & get',
      subtitle: 'Up to INR 500 Off',
      code: 'BNG123',
      description: 'Enjoy Bus Tickets to Different Destinations At A Discount up to Rs.500',
      validTill: '30th June, 2024',
      backgroundImage: 'assets/User/img4.webp'
    }
  ];

  breakpoints = {
    640: { slidesPerView: 1, spaceBetween: 10 },
    768: { slidesPerView: 2, spaceBetween: 15 },
    1200: { slidesPerView: 3, spaceBetween: 20 }
  };

  private resizeListener!: () => void;

  ngOnInit(): void {
    register();
    this.resizeListener = this.onResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  stringifyBreakpoints(): string {
    return JSON.stringify(this.breakpoints);
  }

  private onResize() {
    this.initializeSwiper();
  }

  private initializeSwiper() {
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      Object.assign(swiperEl, this.breakpoints);
      swiperEl.initialize();
      this.cdr.detectChanges();
    }
  }
}