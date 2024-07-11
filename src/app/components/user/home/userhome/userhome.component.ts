import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsernavComponent } from '../../common/usernav/usernav.component';
import { CommonModule } from '@angular/common';
import { OffersComponent } from '../offers/offers.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { FaqsComponent } from '../faqs/faqs.component';
import { BusBenefitsComponent } from '../bus-benefits/bus-benefits.component';

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    UsernavComponent,
    OffersComponent,
    BusBenefitsComponent,
    FaqsComponent,
    FooterComponent
  ],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css',
})
export class UserhomeComponent {

}