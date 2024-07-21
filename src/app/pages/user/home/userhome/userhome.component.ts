import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UsernavComponent } from '../../../../shared/widgets/usernav/usernav.component';
import { CommonModule } from '@angular/common';
import { OffersComponent } from '../offers/offers.component';
import { FooterComponent } from '../../../../shared/widgets/footer/footer.component';
import { FaqsComponent } from '../faqs/faqs.component';
import { BusBenefitsComponent } from '../bus-benefits/bus-benefits.component';
import { NotificationBannerComponent } from '../notification-banner/notification-banner.component';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

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
    FooterComponent,
    NotificationBannerComponent,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    JsonPipe,
    RouterModule
  ],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css',
})
export class UserhomeComponent {
  model !: NgbDateStruct;
} 