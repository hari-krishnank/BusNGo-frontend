import { Component } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { UpdateSearchComponent } from '../update-search/update-search.component';
import { FilterBusesComponent } from '../filter-buses/filter-buses.component';
import { CommonModule } from '@angular/common';
import { SortBusesComponent } from '../sort-buses/sort-buses.component';
import { BusrouteDetailsComponent } from '../busroute-details/busroute-details.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, UsernavComponent, UpdateSearchComponent, FilterBusesComponent, SortBusesComponent, BusrouteDetailsComponent, FooterComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

}
