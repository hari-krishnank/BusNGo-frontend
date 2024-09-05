import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';

@Component({
  selector: 'app-bookingsnavbar',
  standalone: true,
  imports: [UsernavComponent, MatButtonModule, RouterModule],
  templateUrl: './bookingsnavbar.component.html',
  styleUrl: './bookingsnavbar.component.css'
})
export class BookingsnavbarComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}