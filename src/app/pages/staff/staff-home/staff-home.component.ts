import { Component } from '@angular/core';
import { StaffnavComponent } from '../../../shared/widgets/staffnav/staffnav.component';

@Component({
  selector: 'app-staff-home',
  standalone: true,
  imports: [StaffnavComponent],
  templateUrl: './staff-home.component.html',
  styleUrl: './staff-home.component.css'
})
export class StaffHomeComponent {

}
