import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { RouterModule } from '@angular/router';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';

@Component({
  selector: 'app-confirm-details',
  standalone: true,
  imports: [OwnernavComponent, RouterModule, BusOwnerfooterComponent],
  templateUrl: './confirm-details.component.html',
  styleUrl: './confirm-details.component.css'
})
export class ConfirmDetailsComponent {

}
