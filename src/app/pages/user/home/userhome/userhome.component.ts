import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormComponent } from '../../../../shared/reusableComponents/form/form.component';
import { SearchTripService } from '../../../../core/services/user/search-trip.service';
import { Subject, takeUntil } from 'rxjs';
import { FormService } from '../../../../core/services/user/search-form.service';
import { DateService } from '../../../../core/services/user/date.service';

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [MatButtonModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, NgbDatepickerModule,
    NgbAlertModule, JsonPipe, CommonModule, RouterModule, FormsModule, UsernavComponent, NotificationBannerComponent,
    FormComponent, OffersComponent, BusBenefitsComponent, FaqsComponent, FooterComponent
  ],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css',
})
export class UserhomeComponent implements OnInit, OnDestroy {
  searchForm!: FormGroup;
  From = this.formService.getFromFields();
  To = this.formService.getToFields();
  Date = this.formService.getDateFields();
  minDate: Date;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private searchTripService: SearchTripService,
    private formService: FormService,
    private dateService: DateService
  ) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.searchForm = this.formService.createSearchForm();
    this.setupDebouncing();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupDebouncing() {
    this.formService.setupDebouncing(this.searchForm, this.destroy$);
  }

  onSearchSubmit() {
    if (this.searchForm.valid) {
      const searchData = this.formService.getSearchData(this.searchForm);
      console.log('Search data:', searchData);

      const adjustedDate = new Date(searchData.date);
      searchData.date = adjustedDate.toISOString().split('T')[0];

      this.searchTripService.searchTrips(searchData).pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (results) => {
          this.formService.storeSearchData(searchData, results);
          this.router.navigate(['/searchresults'], {
            state: {
              searchResults: results,
              selectedDate: searchData.date,
              from: searchData.from,
              to: searchData.to
            }
          });
        },
        (error) => {
          console.error('Error searching trips:', error);
        }
      );
    }
  }
} 