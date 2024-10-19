import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { CompletedBookingService } from '../../../core/services/user/completed-booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CancellationBookingPolicyComponent } from '../cancellation-booking-policy/cancellation-booking-policy.component';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [UsernavComponent, CommonModule, MatCardModule, MatButtonModule, CancellationBookingPolicyComponent, TimeFormatPipe],
  templateUrl: './booking-success.component.html',
  styleUrl: './booking-success.component.css'
})
export class BookingSuccessComponent implements OnInit {
  bookingDetails: any;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private completedBookingService: CompletedBookingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const bookingId = params['booking_id'];
      if (bookingId) {
        this.fetchCompletedBooking(bookingId);
      } else {
        this.snackBar.open('Booking ID not found', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  fetchCompletedBooking(bookingId: string) {
    this.completedBookingService.getCompletedBooking(bookingId).subscribe(
      (data) => {
        this.bookingDetails = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching completed booking:', error);
        this.snackBar.open('Error loading booking details', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    );
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  getTimeframe(index: number, cancellationPolicy: { hours: number; refundPercentage: number }[]): string {
    if (index === 0) {
      return `${cancellationPolicy[index].hours} hours before departure`;
    } else if (index === cancellationPolicy.length - 1) {
      return `Less than ${cancellationPolicy[index - 1].hours} hours before departure`;
    } else {
      return `${cancellationPolicy[index].hours} - ${cancellationPolicy[index - 1].hours} hours before departure`;
    }
  }

  generatePDF() {
    const elementToPrint: any = document.getElementById('contentToConvertPDF')
    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imageWidth = 190;
      const imageHeight = canvas.height * imageWidth / canvas.width;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, imageWidth, imageHeight);

      pdf.setProperties({
        title: 'BusNGO Ticket'
      })

      pdf.setFontSize(12)

      pdf.save('BusNGoTicket.pdf')
    });
  }

  goToHome() {
    this.router.navigate(['/user/home']);
  }
}