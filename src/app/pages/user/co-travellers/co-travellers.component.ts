import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-co-travellers',
  standalone: true,
  imports: [UsernavComponent, ProfileSideBarComponent, FooterComponent, CommonModule, MatButtonModule],
  templateUrl: './co-travellers.component.html',
  styleUrl: './co-travellers.component.css'
})
export class CoTravellersComponent {

}