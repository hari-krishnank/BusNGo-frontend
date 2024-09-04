import { Component, OnInit } from '@angular/core';
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
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormComponent } from '../../../../shared/reusableComponents/form/form.component';
import { FormField } from '../../../../core/models/user/form-fields.interface';
import { SearchTripService } from '../../../../core/services/user/search-trip.service';
import { HttpClientModule } from '@angular/common/http';
import { From } from '../../../../shared/configs/user/busSearchForm.config';

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, NgbDatepickerModule, NgbAlertModule,
    UsernavComponent, NotificationBannerComponent, OffersComponent, BusBenefitsComponent, FaqsComponent, FooterComponent, FormsModule, JsonPipe, RouterModule, FormComponent, HttpClientModule
  ],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css',
})
export class UserhomeComponent implements OnInit {
  model !: NgbDateStruct;
  searchForm!: FormGroup;
  From: FormField[] = From

  To: FormField[] = [
    {
      name: 'to',
      label: 'From',
      type: 'autocomplete',
      placeholder: 'To',
      validators: [Validators.required],
      errors: [{ type: 'required', message: 'To location is required' }]
    },
  ]

  Date: FormField[] = [
    {
      name: 'dateField',
      type: 'date',
      placeholder: 'Date',
      validators: [Validators.required],
      errors: [{ type: 'required', message: 'Date is required' }]
    }
  ]

  constructor(private fb: FormBuilder, private router: Router, private searchTripService: SearchTripService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      dateField: ['', Validators.required]
    });
  }

  onSearchSubmit() {
    if (this.searchForm.valid) {
      const searchData = {
        from: this.searchForm.get('from')?.value,
        to: this.searchForm.get('to')?.value,
        date: this.formatDate(this.searchForm.get('dateField')?.value)
      };

      console.log('Sending search data:', searchData);

      this.searchTripService.searchTrips(searchData).subscribe(
        (results) => {
          console.log('Received search results:', results);
          const searchDataToStore = { ...searchData, results };
          localStorage.setItem('searchData', JSON.stringify(searchDataToStore));
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

  private formatDate(date: string | Date): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
      return new Date(date).toISOString().split('T')[0];
    } else {
      console.error('Invalid date format:', date);
      return '';
    }
  }
} 