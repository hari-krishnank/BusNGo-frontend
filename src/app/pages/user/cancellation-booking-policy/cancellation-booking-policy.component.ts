import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';

@Component({
  selector: 'app-cancellation-booking-policy',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
  templateUrl: './cancellation-booking-policy.component.html',
  styleUrl: './cancellation-booking-policy.component.css'
})
export class CancellationBookingPolicyComponent implements OnInit {
  @Input() cancellationPolicy: { hours: number; refundPercentage: number }[] = [];
  @Input() departureTime!: string;
  @Input() hoursUntilDeparture!: number;
  @Input() currentRefundPercentage!: number;

  showCancellationPolicy = false;
  showBookingPolicy = false;
  isCancellationPossible: boolean = true;
  cancellationNotes: string[] = [
    'Partial cancellation of tickets is not allowed',
    'No refund is available 6 hours left for the departure',
    'Ticket cannot be cancelled after scheduled bus departure time from the first boarding point'
  ];

  ngOnInit() {
    this.cancellationPolicy.sort((a, b) => b.hours - a.hours);
    this.updateCancellationStatus();
  }

  updateCancellationStatus() {
    this.isCancellationPossible = this.hoursUntilDeparture > 0;
  }

  toggleCancellationPolicy() {
    this.showCancellationPolicy = !this.showCancellationPolicy;
  }

  toggleBookingPolicy() {
    this.showBookingPolicy = !this.showBookingPolicy;
  }

  getTimeframe(index: number): string {
    if (index === 0) {
      return `${this.cancellationPolicy[index].hours} hours before departure`;
    } else if (index === this.cancellationPolicy.length - 1) {
      return `Less than ${this.cancellationPolicy[index - 1].hours} hours before departure`;
    } else {
      return `${this.cancellationPolicy[index].hours} - ${this.cancellationPolicy[index - 1].hours} hours before departure`;
    }
  }
}