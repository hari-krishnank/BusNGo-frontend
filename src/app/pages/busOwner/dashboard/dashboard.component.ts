import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, OwnersecondnavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
