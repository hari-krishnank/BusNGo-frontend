import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ownernav',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, RouterModule, MatMenuModule, CommonModule],
  templateUrl: './ownernav.component.html',
  styleUrl: './ownernav.component.css'
})
export class OwnernavComponent {

}
