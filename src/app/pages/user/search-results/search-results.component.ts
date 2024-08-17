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
import { SearchResultsService } from '../../../core/services/user/search-result.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SeatPreviewComponent } from '../../busOwner/seat-preview/seat-preview.component';
import { UserSeatBookingComponent } from '../user-seat-booking/user-seat-booking.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, SeatPreviewComponent, UserSeatBookingComponent, UsernavComponent, UpdateSearchComponent, FilterBusesComponent, SortBusesComponent, BusrouteDetailsComponent, FooterComponent, MatButtonModule, MatIconModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[] = [];
  selectedDate: string = '';
  searchData: any;
  expandedTripIds: { [key: string]: boolean } = {};
  selectedSections: { [key: string]: string } = {};
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private searchResultsService: SearchResultsService
  ) {
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
    if (navigation && navigation.extras && navigation.extras.state) {
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
        if (results && results.length > 0) {
          this.searchResults = results;
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
    this.searchResults = results;
    this.selectedDate = date;
    this.searchData = data;
    this.searchResultsService.updateSearchResults(results, date, data);
  }

  getActiveFacilities(facilities: any[]): any[] {
    return facilities.filter(facility => facility.status === 'Active');
  }

  formatDisplayDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }

  toggleTripDetails(tripId: string) {
    this.expandedTripIds[tripId] = !this.expandedTripIds[tripId];
    if (this.expandedTripIds[tripId]) {
      this.selectedSections[tripId] = 'SELECT SEATS';
    } else {
      delete this.selectedSections[tripId];
    }
  }

  isTripExpanded(tripId: string): boolean {
    return !!this.expandedTripIds[tripId];
  }

  trackByTripId(index: number, trip: any): number {
    console.log(trip._id);
    return trip._id;
  }

  selectSection(tripId: string, section: string) {
    this.selectedSections[tripId] = section;
  }

  isSelectedSection(tripId: string, section: string): boolean {
    return this.selectedSections[tripId] === section;
  }

  getSeatLayout(trip: any): any {
    // console.log('Getting seat layout for trip:', trip);
    const layout = trip.fleetType.seatLayout;
    // console.log('Seat layout:', layout);
    return layout;
  }

  onSeatsSelected(tripName: string, selectedSeats: string[]) {
    console.log(`Selected seats for trip ${tripName}:`, selectedSeats);
    const trip = this.searchResults.find(t => t.bus.name === tripName);
    if (trip) {
      trip.selectedSeats = selectedSeats;
    }
  }

  bookSeats(trip: any) {
    if (trip.selectedSeats && trip.selectedSeats.length > 0) {
      console.log(`Booking seats for trip ${trip.bus.name}:`, trip.selectedSeats);
    } else {
      console.log('Please select seats before booking');
    }
  }
}