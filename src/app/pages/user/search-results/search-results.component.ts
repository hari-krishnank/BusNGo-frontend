import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsernavComponent } from '../../../shared/widgets/usernav/usernav.component';
import { FooterComponent } from '../../../shared/widgets/footer/footer.component';
import { UpdateSearchComponent } from '../update-search/update-search.component';
import { FilterBusesComponent } from '../filter-buses/filter-buses.component';
import { CommonModule } from '@angular/common';
import { SortBusesComponent } from '../sort-buses/sort-buses.component';
import { BusrouteDetailsComponent } from '../busroute-details/busroute-details.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SearchResultsService } from '../../../core/services/user/search-result.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SeatPreviewComponent } from '../../busOwner/seat-preview/seat-preview.component';
import { SeatSelectionComponent } from '../seat-selection/seat-selection.component';
import { TripService } from '../../../core/services/user/trip.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, UsernavComponent, UpdateSearchComponent, SortBusesComponent, FilterBusesComponent, SeatPreviewComponent, SeatSelectionComponent, BusrouteDetailsComponent, FooterComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchResults: any[] = [];
  selectedDate: string = '';
  searchData: any;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private searchResultsService: SearchResultsService, public tripService: TripService) {
    this.handleRouterNavigation();
  }

  ngOnInit() {
    this.subscribeToSearchUpdates();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private handleRouterNavigation() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.updateComponentData(
        navigation.extras.state['searchResults'],
        navigation.extras.state['selectedDate'],
        {
          from: navigation.extras.state['from'],
          to: navigation.extras.state['to'],
          date: navigation.extras.state['selectedDate']
        }
      );
    }
  }

  private subscribeToSearchUpdates() {
    this.subscription.add(
      this.searchResultsService.searchResults$.subscribe(results => {
        if (results?.length > 0) {
          this.searchResults = results;
          console.log('sdfasdfasdfa', this.searchResults);
        }
      })
    );

    this.subscription.add(
      this.searchResultsService.selectedDate$.subscribe(date => {
        if (date) {
          this.selectedDate = date;
        }
      })
    );

    this.subscription.add(
      this.searchResultsService.searchData$.subscribe(data => {
        if (data) {
          this.searchData = data;
        }
      })
    );
  }

  private updateComponentData(results: any[], date: string, data: any) {
    this.searchResultsService.updateSearchResults(results, date, data);
  }

  trackByTripId(index: number, trip: any): number {
    return trip._id;
  }

  onSeatsSelected(tripName: string, selectedSeats: string[]) {
    console.log(`Selected seats for trip ${tripName}:`, selectedSeats);
    const trip = this.searchResults.find(t => t.bus.name === tripName);
    if (trip) {
      trip.selectedSeats = selectedSeats;
    }
  }

  bookSeats(trip: any) {
    if (trip.selectedSeats?.length > 0) {
      console.log(`Booking seats for trip ${trip.bus.name}:`, trip.selectedSeats);
    } else {
      console.log('Please select seats before booking');
    }
  }
}  