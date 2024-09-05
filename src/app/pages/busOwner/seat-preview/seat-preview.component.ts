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
  @Input() selectedSeats: string[] = [];
  @Input() bookedSeats: string[] = [];
  @Input() previewMode: boolean = false;
  @Input() isOwnerView: boolean = false;
  @Input() allowUserSelection: boolean = false;
  @Input() viewType: 'owner' | 'user' = 'user';
  @Output() seatsSelected = new EventEmitter<string[]>();

  seatLayout!: string[][];
  selectedSeatsMap: Map<string, number> = new Map();
  userSelectedSeats: string[] = [];
  nextSeatNumber: number = 1;
  maxSeatsSelectionLimit = 6;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rows'] || changes['columns']) {
      this.generateSeatLayout();
    }

    if (changes['selectedSeats']) {
      this.updateSelectedSeats();
    }
  }

  generateSeatLayout() {
    if (this.rows === undefined || this.columns === undefined) {
      return;
    }

    this.seatLayout = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.columns; j++) {
        row.push(`${i}-${j}`);
      }
      this.seatLayout.push(row);
    }
  }

  updateSelectedSeats() {
    this.selectedSeatsMap.clear();
    this.nextSeatNumber = 1;
    if (this.selectedSeats && Array.isArray(this.selectedSeats)) {
      for (const seat of this.selectedSeats) {
        this.selectedSeatsMap.set(seat, this.nextSeatNumber++);
      }
    }
  }

  toggleSeatSelection(seat: string) {
    if (!this.allowUserSelection || this.isSeatBooked(seat)) return;

    if (this.userSelectedSeats.length >= this.maxSeatsSelectionLimit && !this.isUserSelected(seat)) {
      alert('Maximum 6 seats allowed per booking')
      return;
    }

    const index = this.userSelectedSeats.indexOf(seat);
    if (index > -1) {
      this.userSelectedSeats.splice(index, 1);
    } else {
      this.userSelectedSeats.push(seat);
      console.log('user select cheytha seat', this.userSelectedSeats);
    }
    this.seatsSelected.emit(this.userSelectedSeats);
  }

  toggleSeatSelectionOwner(seat: string) {
    if (this.previewMode || this.isOwnerView) return;

    if (this.selectedSeatsMap.has(seat)) {
      this.selectedSeatsMap.delete(seat);
    } else {
      this.selectedSeatsMap.set(seat, this.nextSeatNumber++);
    }
    this.seatsSelected.emit(Array.from(this.selectedSeatsMap.keys()));
  }

  isSeatSelected(seat: string): boolean {
    return this.selectedSeatsMap.has(seat);
  }

  isUserSelected(seat: string): boolean {
    return this.userSelectedSeats.includes(seat);
  }

  getSeatNumber(seat: string): number | null {
    return this.selectedSeatsMap.get(seat) || null;
  }

  isSeatBooked(seat: string): boolean {
    return this.bookedSeats && this.bookedSeats.includes(seat);
  }
}