import { Component, Input } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { UpdateSearchService } from '../../../core/services/user/update-search.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-search',
  standalone: true,
  imports: [UsernavComponent, FormComponent, MatButtonModule, HttpClientModule],
  templateUrl: './update-search.component.html',
  styleUrl: './update-search.component.css'
})
export class UpdateSearchComponent {
  @Input() searchData: any;

  updateSearchForm!: FormGroup;

  From: FormField[] = [
    {
      name: 'from',
      type: 'autocomplete',
      placeholder: 'From',
      validators: [Validators.required],
      errors: [{ type: 'required', message: 'From location is required' }]
    }
  ];

  To: FormField[] = [
    {
      name: 'to',
      type: 'autocomplete',
      placeholder: 'To',
      validators: [Validators.required],
      errors: [{ type: 'required', message: 'To location is required' }]
    },
  ];

  Date: FormField[] = [
    {
      name: 'dateField',
      type: 'date',
      placeholder: 'Date',
      validators: [Validators.required],
      errors: [{ type: 'required', message: 'Date is required' }]
    }
  ];

  constructor(private fb: FormBuilder, private updateSearchService: UpdateSearchService, private router: Router) { }

  ngOnInit() {
    this.updateSearchForm = this.fb.group({
      from: [this.searchData?.from || '', Validators.required],
      to: [this.searchData?.to || '', Validators.required],
      dateField: [this.searchData?.date || '', Validators.required]
    });
  }

  swapFromTo() {
    const fromValue = this.updateSearchForm.get('from')?.value;
    const toValue = this.updateSearchForm.get('to')?.value;

    this.updateSearchForm.patchValue({
      from: toValue,
      to: fromValue
    });
  }

  onUpdateSearch() {
    if (this.updateSearchForm.valid) {
      const searchData = {
        from: this.updateSearchForm.get('from')?.value,
        to: this.updateSearchForm.get('to')?.value,
        date: this.updateSearchForm.get('dateField')?.value
      };

      this.updateSearchService.updateSearch(searchData).subscribe(
        (results) => {
          console.log('Received updated search results:', results);
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
          console.error('Error updating search:', error);
        }
      );
    }
  }
}
