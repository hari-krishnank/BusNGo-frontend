import { Component } from '@angular/core';
import { StaffnavComponent } from '../../../shared/widgets/staffnav/staffnav.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [StaffnavComponent, MatButtonModule],
  templateUrl: './staff-dashboard.component.html',
  styleUrl: './staff-dashboard.component.css'
})
export class StaffDashboardComponent {

}
