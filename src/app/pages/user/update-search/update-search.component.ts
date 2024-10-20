import { Component, Input } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { FormComponent } from '../../../shared/reusableComponents/form/form.component';
import { MatButtonModule } from '@angular/material/button';
import { UpdateSearchService } from '../../../core/services/user/update-search.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultsService } from '../../../core/services/user/search-result.service';
import { dateFieldConfig, From, To } from '../../../shared/configs/user/updateSearchForm.config';
import { dateValidator } from '../../../shared/validators/search-date.validator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-update-search',
  standalone: true,
  imports: [UsernavComponent, FormComponent, MatButtonModule, HttpClientModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './update-search.component.html',
  styleUrl: './update-search.component.css'
})
export class UpdateSearchComponent {
  @Input() searchData: any;
  updateSearchForm!: FormGroup;
  From: FormField[] = From
  To: FormField[] = To
  Date: FormField[] = dateFieldConfig

  constructor(
    private fb: FormBuilder,
    private updateSearchService: UpdateSearchService,
    private router: Router,
    private searchResultsService: SearchResultsService
  ) { }

  ngOnInit() {
    this.updateSearchForm = this.fb.group({
      from: [this.searchData?.from || '', Validators.required],
      to: [this.searchData?.to || '', Validators.required],
      dateField: [this.searchData?.date || '', [Validators.required, dateValidator()]]
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
        date: this.formatDate(this.updateSearchForm.get('dateField')?.value)
      };

      this.updateSearchService.updateSearch(searchData).subscribe(
        (results) => {
          console.log('Received updated search results:', results);
          const searchDataToStore = { ...searchData, results };
          localStorage.setItem('searchData', JSON.stringify(searchDataToStore));
          this.searchResultsService.updateSearchResults(results, searchData.date, searchData);
          this.router.navigate(['/searchresults']);
        },
        (error) => {
          console.error('Error updating search:', error);
        }
      );
    }
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}