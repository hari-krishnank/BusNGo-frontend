import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  standalone: true,
  imports: [ MatIconModule, MatMenuModule, RouterModule, CommonModule ],
  templateUrl: './adminnav.component.html',
  styleUrl: './adminnav.component.css'
})
export class AdminnavComponent {
  constructor() {}

  logout() {

  }
}
