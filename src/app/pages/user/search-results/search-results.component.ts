import { Component, OnInit } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { UpdateSearchComponent } from '../update-search/update-search.component';
import { FilterBusesComponent } from '../filter-buses/filter-buses.component';
import { CommonModule } from '@angular/common';
import { SortBusesComponent } from '../sort-buses/sort-buses.component';
import { BusrouteDetailsComponent } from '../busroute-details/busroute-details.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, UsernavComponent, UpdateSearchComponent, FilterBusesComponent, SortBusesComponent, BusrouteDetailsComponent, FooterComponent, MatButtonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  selectedDate: string = '';
  searchData: any

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.searchResults = navigation.extras.state['searchResults'];
      this.selectedDate = navigation.extras.state['selectedDate'];

      this.searchData = {
        from: navigation.extras.state['from'],
        to: navigation.extras.state['to'],
        date: this.selectedDate
      };

      console.log('Received search results in component:', this.searchResults);
      console.log('Selected date:', this.selectedDate);
      console.log('Search data:', this.searchData);
    } else {
      console.log('No search results in navigation state');
    }
  }

  ngOnInit() {
    if (!this.searchResults || this.searchResults.length === 0) {
      console.warn('No search results found. Redirecting to home page.');
      this.router.navigate(['/']);
    }
  }

  formatDisplayDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }
}
