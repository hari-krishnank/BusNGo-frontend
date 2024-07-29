import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-seat-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-preview.component.html',
  styleUrl: './seat-preview.component.css'
})
export class SeatPreviewComponent implements OnChanges {
  @Input() rows!: number;
  @Input() columns!: number;
  @Input() driverSeatPosition!: 'Left' | 'Right';
  @Output() seatsSelected = new EventEmitter<string[]>();

  seatLayout!: string[][];
  selectedSeats: Set<string> = new Set();

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['rows'] && this.rows !== undefined) ||
      (changes['columns'] && this.columns !== undefined) ||
      (changes['driverSeatPosition'] && this.driverSeatPosition !== undefined)
    ) {
      this.generateSeatLayout();
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
    if (seat === 'D') return;
    if (this.selectedSeats.has(seat)) {
      this.selectedSeats.delete(seat);
    } else {
      this.selectedSeats.add(seat);
    }
    this.seatsSelected.emit(Array.from(this.selectedSeats));
  }
}