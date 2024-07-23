import { Component } from '@angular/core';
import { OwnernavComponent } from '../ownernav/ownernav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ownersecondnav',
  standalone: true,
  imports: [OwnernavComponent, MatIconModule, MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './ownersecondnav.component.html',
  styleUrl: './ownersecondnav.component.css'
})
export class OwnersecondnavComponent {
  FleetMenu!: MatMenuTrigger;
  TripMenu!: MatMenuTrigger;

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
