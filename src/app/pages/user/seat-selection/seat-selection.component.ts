import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SeatPreviewComponent } from '../../busOwner/seat-preview/seat-preview.component';
import { SeatBookingComponent } from '../seat-booking/seat-booking.component';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { boardingFields, droppingFields } from '../../../shared/configs/user/boadingAndDropping.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, MatButtonModule, SeatPreviewComponent, SeatBookingComponent, FormComponent],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css'
})
export class SeatSelectionComponent implements OnInit {
  @Input() trip: any;
  @Output() seatsSelected = new EventEmitter<string[]>();
  @Output() bookSeatsClicked = new EventEmitter<any>();
  @Output() toggleSidebar = new EventEmitter<void>();
  @ViewChild(SeatBookingComponent) seatBookingComponent!: SeatBookingComponent;
  @Output() bookTrip = new EventEmitter<{ trip: any; boardingPoint: any; droppingPoint: any }>();
  @ViewChild(SeatPreviewComponent) seatPreviewComponent!: SeatPreviewComponent;
  boardingFields!: any[]
  droppingFields!: any[]
  boardingForm!: FormGroup;
  droppingForm!: FormGroup;
  showErrorMessage = false;
  totalTicketPrice: number = 0;

  boardingPoint!: any;
  droppingPoint!: any;

  constructor(private formBuilder: FormBuilder) {
    this.boardingForm = this.formBuilder.group({
      boardingPoint: ['', Validators.required]
    });
    this.droppingForm = this.formBuilder.group({
      droppingPoint: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.boardingFields = boardingFields(this.trip);
    this.droppingFields = droppingFields(this.trip);
  }

  onBoardingPointSelected(data: any) {
    this.boardingPoint = data.boardingPoint;
    this.showErrorMessage = false;
  }

  onDroppingPointSelected(data: any) {
    this.droppingPoint = data.droppingPoint;
    this.showErrorMessage = false;
  }

  getSeatLayout(trip: any): any {
    return trip.fleetType.seatLayout;
  }

  getDroppingPoints(): any[] {
    const droppingPoints = [];

    droppingPoints.push({
      id: this.trip.endTo._id,
      location: this.trip.endTo.location,
      time: this.trip?.route?.schedule?.end,
      city: this.trip.endTo.city
    });

    if (this.trip.route && this.trip.route.additionalStops) {
      this.trip.route.additionalStops.forEach((stop: any) => {
        droppingPoints.push({
          id: stop.stop._id,
          time: stop.reachingTime,
          location: stop.stop.location,
          city: stop.stop.city
        });
      });
    }
    return droppingPoints;
  }

  onSeatsSelected(tripName: string, selectedSeats: string[]) {
    this.seatsSelected.emit(selectedSeats);
    console.log('seat emited:', this.seatsSelected.emit(selectedSeats));
    this.totalTicketPrice = selectedSeats.length * this.trip.ticketPrice;
  }

  bookSeats() {
    if (this.boardingForm.valid && this.droppingForm.valid) {
      this.boardingPoint = this.boardingForm.get('boardingPoint')?.value;
      console.log('Selected boarding point:', this.boardingPoint);
      this.droppingPoint = this.droppingForm.get('droppingPoint')?.value;
      console.log('Selected dropping point:', this.droppingPoint);

      this.bookTrip.emit({ trip: this.trip, boardingPoint: this.boardingPoint, droppingPoint: this.droppingPoint });

      if (this.seatBookingComponent) {
        this.seatBookingComponent.toggleSidebar();
      }
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }
} 