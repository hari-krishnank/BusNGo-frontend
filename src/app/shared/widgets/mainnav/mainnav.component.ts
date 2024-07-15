import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mainnav',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, RouterModule, MatMenuModule],
  templateUrl: './mainnav.component.html',
  styleUrl: './mainnav.component.css'
})
export class MainnavComponent {

}
