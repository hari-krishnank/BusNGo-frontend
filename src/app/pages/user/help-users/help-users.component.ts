import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';

@Component({
  selector: 'app-help-users',
  standalone: true,
  imports: [UsernavComponent],
  templateUrl: './help-users.component.html',
  styleUrl: './help-users.component.css'
})
export class HelpUsersComponent {

}
