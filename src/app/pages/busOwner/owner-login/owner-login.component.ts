import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { MatIconModule } from '@angular/material/icon';
import { OwnerFaqComponent } from '../owner-faq/owner-faq.component';
import { OwnerFooterComponent } from '../../../shared/widgets/owner-footer/owner-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-owner-login',
  standalone: true,
  imports: [ OwnernavComponent, MatIconModule, OwnerFaqComponent, OwnerFooterComponent, RouterModule ],
  templateUrl: './owner-login.component.html',
  styleUrl: './owner-login.component.css'
})
export class OwnerLoginComponent {

}
