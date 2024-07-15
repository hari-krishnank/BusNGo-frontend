import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { RouterModule } from '@angular/router';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';

@Component({
  selector: 'app-agency-details',
  standalone: true,
  imports: [OwnernavComponent, RouterModule, BusOwnerfooterComponent],
  templateUrl: './agency-details.component.html',
  styleUrl: './agency-details.component.css'
})
export class AgencyDetailsComponent {

}
