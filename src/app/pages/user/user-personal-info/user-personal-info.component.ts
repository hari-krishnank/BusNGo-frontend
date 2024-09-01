import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-personal-info',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './user-personal-info.component.html',
  styleUrl: './user-personal-info.component.css'
})
export class UserPersonalInfoComponent {

}