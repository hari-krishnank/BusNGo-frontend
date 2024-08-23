import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor() { }

  expandedTripIds: { [key: string]: boolean } = {};
  selectedSections: { [key: string]: string } = {};

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

  selectSection(tripId: string, section: string) {
    this.selectedSections[tripId] = section;
  }

  isSelectedSection(tripId: string, section: string): boolean {
    return this.selectedSections[tripId] === section;
  }

  formatDisplayDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }
}