import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, OwnernavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}