import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { ProfileSideBarComponent } from '../profile-side-bar/profile-side-bar.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [UsernavComponent, ProfileSideBarComponent, FooterComponent, MatButtonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

}
