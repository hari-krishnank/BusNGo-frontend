import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-co-travellers-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './co-travellers-card.component.html',
  styleUrl: './co-travellers-card.component.css'
})
export class CoTravellersCardComponent {
  @Input() traveller: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();
 
  onEdit() {
    this.edit.emit(this.traveller); 
  }

  onDelete() {
    this.delete.emit(this.traveller._id);
  }
}
