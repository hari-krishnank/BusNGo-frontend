import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-seat-preview',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './seat-preview.component.html',
  styleUrl: './seat-preview.component.css'
})
export class SeatPreviewComponent implements OnChanges {
  @Input() rows!: number;
  @Input() columns!: number;
  @Input() driverSeatPosition!: 'Left' | 'Right';
  @Input() selectedSeats: string[] = [];
  @Input() previewMode: boolean = false;
  @Input() isOwnerView: boolean = false;
  @Output() seatsSelected = new EventEmitter<string[]>();

  seatLayout!: string[][];
  selectedSeatsSet: Set<string> = new Set();

  ngOnChanges(changes: SimpleChanges) {

    console.log('SeatPreviewComponent inputs:', {
      rows: this.rows,
      columns: this.columns,
      driverSeatPosition: this.driverSeatPosition,
      selectedSeats: this.selectedSeats,
    });

    if (changes['selectedSeats']) {
      this.selectedSeatsSet = new Set(this.selectedSeats);
    }
    if (changes['rows'] || changes['columns'] || changes['driverSeatPosition'] || changes['selectedSeats']) {
      this.generateSeatLayout();
      this.selectedSeatsSet = new Set(this.selectedSeats);
    }
  }

  generateSeatLayout() {
    if (this.rows === undefined || this.columns === undefined || this.driverSeatPosition === undefined) {
      return;
    }

    this.seatLayout = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.columns; j++) {
        if (i === 0 && j === (this.driverSeatPosition === 'Left' ? 0 : this.columns - 1)) {
          row.push('D');
        } else {
          row.push((i * this.columns + j + 1).toString());
        }
      }
      this.seatLayout.push(row);
    }
  }

  toggleSeatSelection(seat: string) {
    if (seat === 'D' || this.previewMode || this.isOwnerView) return;
    if (this.selectedSeatsSet.has(seat)) {
      this.selectedSeatsSet.delete(seat);
    } else {
      this.selectedSeatsSet.add(seat);
    }
    this.seatsSelected.emit(Array.from(this.selectedSeatsSet));
  }

  isSeatSelected(seat: string): boolean {
    return this.selectedSeatsSet.has(seat);
  }

  shouldDisplaySeat(seat: string): boolean {
    return seat === 'D' || this.selectedSeatsSet.has(seat);
  }

  getSeatIcon(seat: string): string {
    if (seat === 'D') return 'directions_car';
    return this.isSeatSelected(seat) ? 'event_seat' : 'chair';
  }

  getSeatTooltip(seat: string): string {
    if (seat === 'D') return 'Driver Seat';
    return this.isSeatSelected(seat) ? 'Selected' : 'Available';
  }
}