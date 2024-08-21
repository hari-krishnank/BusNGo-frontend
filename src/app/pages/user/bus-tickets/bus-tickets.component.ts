import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';

@Component({
  selector: 'app-bus-tickets',
  standalone: true,
  imports: [UsernavComponent, MatButtonModule, MatCardModule, MatIconModule, MatInputModule],
  templateUrl: './bus-tickets.component.html',
  styleUrl: './bus-tickets.component.css'
})
export class BusTicketsComponent { }