import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { Router } from '@angular/router';
import { ageField, emailField, firstNameField, lastNameField, phoneField } from '../../../shared/configs/user/passengerDetailsForm.config';
import { CommonModule } from '@angular/common';
import { PendingBookingService } from '../../../core/services/user/pending-booking.service';
import { SeatPreviewComponent } from '../../busOwner/seat-preview/seat-preview.component';

@Component({
  selector: 'app-seat-booking',
  standalone: true,
  imports: [CommonModule, SidebarModule, MatSidenavModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, FormsModule, MatIconModule, FormComponent, ReactiveFormsModule],
  templateUrl: './seat-booking.component.html',
  styleUrl: './seat-booking.component.css'
})
export class SeatBookingComponent implements OnInit, OnChanges {
  sidebarVisible2: boolean = false;
  passengerDetailsForm !: FormGroup;
  firstName!: FormField[];
  lastName!: FormField[];
  age!: FormField[];
  phone!: FormField[];
  email!: FormField[];
  @Input() trip: any;
  @Input() boardingPoint: any;
  @Input() droppingPoint: any;
  travellersDetails: FormGroup[] = [];
  totalTicketPrice: number = 0;
  @ViewChild(SeatPreviewComponent) seatPreviewComponent!: SeatPreviewComponent;
  @Input() seatNumbers: (string | number)[] = [];

  constructor(private fb: FormBuilder, private router: Router, private pendingBookingService: PendingBookingService) { }

  ngOnInit() {
    this.initializeFormFields()
  }

  ngOnChanges() {
    this.updateTotalTicketPrice();
  }

  initializeFormFields() {
    this.initForm();
    this.initFormFields();
    console.log('Trip:', this.trip);

    if (this.trip && this.trip.selectedSeats) {
      this.travellersDetails = [];
      for (let i = 0; i < this.trip.selectedSeats.length; i++) {
        this.travellersDetails.push(this.createTravellerForm());
      }
    } else {
      console.error('Trip object is undefined or selectedSeats is undefined');
    }
  }

  createTravellerForm(): FormGroup {
    return this.fb.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]]
    });
  }


  initForm() {
    this.passengerDetailsForm = this.fb.group({
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  initFormFields() {
    this.firstName = firstNameField;
    this.lastName = lastNameField;
    this.age = ageField;
    this.phone = phoneField;
    this.email = emailField;
  }

  updateTotalTicketPrice() {
    if (this.trip && this.trip.selectedSeats) {
      this.totalTicketPrice = this.trip.selectedSeats.length * this.trip.ticketPrice;
      console.log('paisa', this.totalTicketPrice);
    }
  }

  onSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
  }

  toggleSidebar() {
    this.sidebarVisible2 = !this.sidebarVisible2;
    if (this.sidebarVisible2) {
      this.initializeFormFields();
    }
  }

  seatBooking() {
    const sanitizedTripDetails = {
      selectedSeatNumbers: this.seatNumbers
    };

    const pendingBookingData = {
      userId: 'user-id',
      tripId: this.trip._id,
      tripDetails: sanitizedTripDetails,
      selectedSeats: this.trip.selectedSeats,
      selectedSeatNumbers: this.seatNumbers,
      boardingPoint: this.boardingPoint,
      droppingPoint: this.droppingPoint,
      travellersDetails: this.travellersDetails.map(form => form.value),
      totalTicketPrice: this.totalTicketPrice,
      email: this.passengerDetailsForm.get('email')?.value,
      phone: this.passengerDetailsForm.get('mobileNumber')?.value
    };

    this.pendingBookingService.createPendingBooking(pendingBookingData).subscribe(
      response => {
        console.log('Pending booking created:', response);
        this.router.navigate(['/busTickets', response.bookingId]);
      },
      error => {
        console.error('Error creating pending booking:', error);
      }
    );
  }
}