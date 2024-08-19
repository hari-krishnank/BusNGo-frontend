import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SeatPreviewComponent } from '../seat-preview/seat-preview.component';
import { modalAnimation } from '../../../shared/animations/modal.animation';

@Component({
  selector: 'app-seat-preview-modal',
  standalone: true,
  imports: [MatDialogModule, SeatPreviewComponent],
  templateUrl: './seat-preview-modal.component.html',
  styleUrl: './seat-preview-modal.component.css',
  animations: [modalAnimation]
})
export class SeatPreviewModalComponent {
  constructor(public dialogRef: MatDialogRef<SeatPreviewModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClose(): void {
    this.dialogRef.close();
  }

  get selectedSeatsCount(): number {
    return this.data.selectedSeats ? this.data.selectedSeats.length : 0;
  }
}