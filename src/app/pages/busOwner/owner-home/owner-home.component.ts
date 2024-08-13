import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [OwnernavComponent, FooterComponent],
  templateUrl: './owner-home.component.html',
  styleUrl: './owner-home.component.css'
})
export class OwnerHomeComponent {

}
