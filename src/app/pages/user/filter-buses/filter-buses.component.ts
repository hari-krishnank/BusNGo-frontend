import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter-buses',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './filter-buses.component.html',
  styleUrl: './filter-buses.component.css'
})
export class FilterBusesComponent {

  busTypes = [
    { label: 'AC', value: 'ac', count: 15 },
    { label: 'Non-AC', value: 'non-ac', count: 10 },
    { label: 'Seater', value: 'seater', count: 12 },
    { label: 'Sleeper', value: 'sleeper', count: 8 }
  ];

  departureTimes = [
    { label: '12 midnight - 6 AM', value: 'early_morning', count: 5 },
    { label: '6 AM - 12 noon', value: 'morning', count: 8 },
    { label: '12 noon - 6 PM', value: 'afternoon', count: 10 },
    { label: '6 PM - 12 midnight', value: 'evening', count: 7 }
  ];

  amenities = [
    { label: 'WiFi', value: 'wifi', selected: false, count: 12 },
    { label: 'USB Charging', value: 'usb', selected: false, count: 15 },
    { label: 'Water Bottle', value: 'water', selected: false, count: 18 },
    { label: 'Blanket', value: 'blanket', selected: false, count: 10 }
  ];

  selectedBusTypes: Set<string> = new Set();
  selectedDepartureTimes: Set<string> = new Set();
  selectedArrivalTimes: Set<string> = new Set();


  getBusTypeButtonClass(value: string): string {
    const baseClasses = 'p-2 rounded transition-colors duration-200 flex items-center justify-center';
    return this.selectedBusTypes.has(value)
      ? `${baseClasses} bg-blue-100 text-blue-700 hover:bg-blue-200`
      : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  }

  getTimeButtonClass(value: string): string {
    const baseClasses = 'p-2 rounded transition-colors duration-200 flex items-center justify-center';
    const isSelectedDeparture = this.selectedDepartureTimes.has(value);
    const isSelectedArrival = this.selectedArrivalTimes.has(value);
    return isSelectedDeparture || isSelectedArrival
      ? `${baseClasses} bg-blue-100 text-blue-700 hover:bg-blue-200`
      : `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  }

  toggleBusType(value: string) {
    if (this.selectedBusTypes.has(value)) {
      this.selectedBusTypes.delete(value);
    } else {
      this.selectedBusTypes.add(value);
    }
  }

  toggleDepartureTime(value: string) {
    if (this.selectedDepartureTimes.has(value)) {
      this.selectedDepartureTimes.delete(value);
    } else {
      this.selectedDepartureTimes.add(value);
    }
  }

  toggleArrivalTime(value: string) {
    if (this.selectedArrivalTimes.has(value)) {
      this.selectedArrivalTimes.delete(value);
    } else {
      this.selectedArrivalTimes.add(value);
    }
  }

  toggleAmenity(value: string) {
    const amenity = this.amenities.find(a => a.value === value);
    if (amenity) {
      amenity.selected = !amenity.selected;
    }
  }

  resetAllFilters() {
    this.selectedBusTypes.clear();
    this.selectedDepartureTimes.clear();
    this.selectedArrivalTimes.clear();
    this.amenities.forEach(amenity => amenity.selected = false);
  }

  resetPriceFilter() {

  }

  resetBusTypeFilter() {
    this.selectedBusTypes.clear();
  }

  resetDepartureFilter() {
    this.selectedDepartureTimes.clear();
  }

  resetArrivalFilter() {
    this.selectedArrivalTimes.clear();
  }

  resetAmenitiesFilter() {
    this.amenities.forEach(amenity => amenity.selected = false);
  }
} 