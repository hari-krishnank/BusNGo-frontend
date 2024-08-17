import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AmenitiesService } from '../../../core/services/busOwner/amenities/amenities.service';
import { amenitiesModalFields } from '../../../shared/configs/busOwner/amenitiesForm-config';
import { amenitiesColumns } from '../../../shared/data/busOwner/amenities-columns';
import { Subscription } from 'rxjs';
import { AmenitiesModalService } from '../../../core/services/busOwner/amenities/amenities-modal.service';
import { AmenitiesSearchService } from '../../../core/services/busOwner/amenities/amenities-search.service';
import { IAmenity, ICreateAmenityDto, IUpdateAmenityDto } from '../../../core/models/busOwner/amenity.interface';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent, ReactiveFormsModule],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent implements OnInit, OnDestroy {
  amenitiesData: IAmenity[] = [];
  filteredAmenitiesData: IAmenity[] = [];
  amenitiesColumns = amenitiesColumns;
  modalFields = amenitiesModalFields;
  private searchSubscription !: Subscription;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(
    private amenitiesService: AmenitiesService,
    private amenitiesModalService: AmenitiesModalService,
    private amenitiesSearchService: AmenitiesSearchService
  ) { }

  ngOnInit() {
    this.loadAmenities();
    this.setupSearch();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadAmenities() {
    this.amenitiesService.getAmenities(this.currentPage, this.itemsPerPage).subscribe(
      data => {
        this.amenitiesData = data.amenities.map((amenity, index) => ({
          ...amenity,
          slNo: (this.currentPage - 1) * this.itemsPerPage + index + 1
        }));
        this.filteredAmenitiesData = [...this.amenitiesData];
        this.totalItems = data.total;
        console.log(this.filteredAmenitiesData);
      },
      (error) => console.error('Error fetching amenities:', error)
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadAmenities();
  }


  onSearch(searchTerm: string) {
    console.log('Search term received in AmenitiesComponent:', searchTerm);
    this.amenitiesSearchService.setSearchTerm(searchTerm);
  }

  setupSearch() {
    this.searchSubscription = this.amenitiesSearchService.getSearchTerms().subscribe(term => {
      console.log('Applying search with term:', term);
      this.filteredAmenitiesData = this.amenitiesSearchService.searchAmenities(this.amenitiesData, term);
      console.log('Filtered data:', this.filteredAmenitiesData);
    });
  }

  openModal(amenity?: IAmenity) {
    this.amenitiesModalService.openModal(amenity, this.modalFields).subscribe(result => {
      if (result) {
        amenity ? this.updateAmenity(amenity._id, result) : this.saveAmenity(result);
      }
    });
  }

  saveAmenity(formData: ICreateAmenityDto) {
    console.log('Form data being sent:', formData);
    this.amenitiesService.createAmenity(formData).subscribe(
      () => this.loadAmenities(),
      (error) => console.error('Error saving amenity:', error)
    );
  }

  updateAmenity(id: string, formData: IUpdateAmenityDto) {
    console.log('Form data being sent for update:', formData);
    this.amenitiesService.updateAmenity(id, formData).subscribe(
      () => this.loadAmenities(),
      (error) => console.error('Error updating amenity:', error)
    );
  }

  deleteAmenity(amenity: IAmenity) {
    this.amenitiesModalService.openDeleteConfirmDialog(amenity).subscribe(result => {
      if (result) {
        this.amenitiesService.deleteAmenity(amenity._id).subscribe(
          () => this.loadAmenities(),
          (error) => console.error('Error deleting amenity:', error)
        );
      }
    });
  }
}