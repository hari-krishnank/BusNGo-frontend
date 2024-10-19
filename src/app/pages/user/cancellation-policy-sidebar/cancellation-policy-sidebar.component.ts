import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';
import { SidebarModule } from 'primeng/sidebar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConfirmationPopupComponent } from '../../../shared/reusableComponents/confirmation-popup/confirmation-popup.component';
import { CompletedBookingService } from '../../../core/services/user/completed-booking.service';

@Component({
  selector: 'app-cancellation-policy-sidebar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, SidebarModule, TimeFormatPipe, ConfirmationPopupComponent],
  templateUrl: './cancellation-policy-sidebar.component.html',
  styleUrl: './cancellation-policy-sidebar.component.css'
})
export class CancellationPolicySidebarComponent {
  // @Input() set visible(value: boolean) {
  //   this.isVisible = value;
  // }
  // @Output() visibleChange = new EventEmitter<boolean>();
  // @ViewChild(ConfirmationPopupComponent) confirmationPopup!: ConfirmationPopupComponent;

  // isVisible: boolean = false;
  // isConfirmationOpen: boolean = false;
  // @Input() booking: any;

  // cancellationNotes: string[] = [
  //   'Partial cancellation of tickets is not allowed',
  //   'No refund is available 6 hours left for the departure',
  //   'Ticket cannot be cancelled after scheduled bus departure time from the first boarding point'
  // ];

  // getTimeframe(index: number, cancellationPolicy: { hours: number; refundPercentage: number }[]): string {
  //   if (index === 0) {
  //     return `${cancellationPolicy[index].hours} hours before departure`;
  //   } else if (index === cancellationPolicy.length - 1) {
  //     return `Less than ${cancellationPolicy[index - 1].hours} hours before departure`;
  //   } else {
  //     return `${cancellationPolicy[index].hours} - ${cancellationPolicy[index - 1].hours} hours before departure`;
  //   }
  // }

  // onSidebarHide() {
  //   this.visibleChange.emit(false);
  // }

  // toggleCancelTicketConfirmation(event: MouseEvent) {
  //   this.isConfirmationOpen = !this.isConfirmationOpen;
  // }

  // onConfirmCancelTicket() {
  //   this.cancelTicket();
  //   this.isConfirmationOpen = false;
  // }

  // onCancelConfirmation() {
  //   this.isConfirmationOpen = false;
  // }

  // private cancelTicket() {
  //   console.log('Ticket cancellation confirmed');
  //   // Implement actual cancellation logic here
  // }

  @Input() set visible(value: boolean) {
    this.isVisible = value;
  }
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() bookingCancelled = new EventEmitter<void>();
  @ViewChild(ConfirmationPopupComponent) confirmationPopup!: ConfirmationPopupComponent;

  isVisible: boolean = false;
  isConfirmationOpen: boolean = false;
  @Input() booking: any;

  cancellationNotes: string[] = [
    'Partial cancellation of tickets is not allowed',
    'No refund is available 6 hours left for the departure',
    'Ticket cannot be cancelled after scheduled bus departure time from the first boarding point'
  ];

  constructor(private completedBookingService: CompletedBookingService) { }

  getTimeframe(index: number, cancellationPolicy: { hours: number; refundPercentage: number }[]): string {
    if (index === 0) {
      return `${cancellationPolicy[index].hours} hours before departure`;
    } else if (index === cancellationPolicy.length - 1) {
      return `Less than ${cancellationPolicy[index - 1].hours} hours before departure`;
    } else {
      return `${cancellationPolicy[index].hours} - ${cancellationPolicy[index - 1].hours} hours before departure`;
    }
  }

  onSidebarHide() {
    this.visibleChange.emit(false);
  }

  toggleCancelTicketConfirmation(event: MouseEvent) {
    this.isConfirmationOpen = !this.isConfirmationOpen;
  }

  onConfirmCancelTicket() {
    this.cancelTicket();
    this.isConfirmationOpen = false;
  }

  onCancelConfirmation() {
    this.isConfirmationOpen = false;
  }

  private cancelTicket() {
    if (this.booking && this.booking.bookingId) {
      this.completedBookingService.cancelBooking(this.booking.bookingId).subscribe({
        next: (response) => {
          console.log('Ticket cancelled successfully:', response);
          // Emit an event to notify the parent component that the booking has been cancelled
          this.bookingCancelled.emit();
          // Close the sidebar
          this.onSidebarHide();
        },
        error: (error) => {
          console.error('Error cancelling ticket:', error);
          // Handle the error (e.g., show an error message to the user)
        }
      });
    }
  }
}