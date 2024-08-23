import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { seatLayoutsColumns } from '../../../shared/data/busOwner/seatLayout-columns';
import { SeatPreviewComponent } from '../seat-preview/seat-preview.component';
import { SeatLayoutService } from '../../../core/services/busOwner/seat-layout/seat-layout.service';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { SeatLayoutFormService } from '../../../core/services/busOwner/seat-layout/seat-layout-form.service';
import { SeatLayoutModalService } from '../../../core/services/busOwner/seat-layout/seat-layout-modal.service';
import { ISeatLayout, SeatLayoutDisplay, SeatLayoutFormData } from '../../../core/models/busOwner/seatLayout.interface';

@Component({
  selector: 'app-seat-layouts',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent, SeatPreviewComponent],
  templateUrl: './seat-layouts.component.html',
  styleUrl: './seat-layouts.component.css'
})
export class SeatLayoutsComponent implements OnInit {
  seatLayoutsData: SeatLayoutDisplay[] = [];
  seatLayoutsColumns = seatLayoutsColumns;
  selectedSeats: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private seatLayoutService: SeatLayoutService, private seatLayoutFormService: SeatLayoutFormService, private seatLayoutModalService: SeatLayoutModalService) { }

  ngOnInit() {
    this.loadSeatLayouts();
  }
 
  loadSeatLayouts() {
    this.seatLayoutService.getSeatLayouts(this.currentPage, this.itemsPerPage).subscribe(
      (layouts) => {
        this.seatLayoutsData = layouts.seatLayouts.map((layout, index) => ({
          ...layout,
          siNo: (this.currentPage - 1) * this.itemsPerPage + index + 1,
          selectedSeats: layout.selectedSeats || [],
          totalSeats: this.seatLayoutFormService.calculateTotalSeats(layout)
        }));
        this.totalItems = layouts.total
      },
      (error) => {
        console.error('Error loading seat layouts:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadSeatLayouts();
  }

  openModal() {
    this.seatLayoutModalService.openAddModal().subscribe(result => {
      if (result) {
        this.saveSeatLayout(result);
      }
    });
  }

  saveSeatLayout(formData: SeatLayoutFormData) {
    this.seatLayoutService.createSeatLayout(formData).subscribe(
      (response) => {
        console.log('Seat layout saved:', response);
        this.loadSeatLayouts();
      },
      (error) => {
        console.error('Error saving seat layout:', error);
      }
    );
  }

  onSeatsSelected(seats: string[]) {
    this.selectedSeats = seats;
  }

  onViewPreview(layout: ISeatLayout) {
    this.seatLayoutModalService.openPreviewModal(layout);
  }

  editSeatLayout(layout: ISeatLayout) {
    this.seatLayoutModalService.openEditModal(layout).subscribe(result => {
      if (result) {
        this.updateSeatLayout(layout._id, result);
      }
    });
  }

  updateSeatLayout(id: string, formData: SeatLayoutFormData) {
    this.seatLayoutService.updateSeatLayout(id, formData).subscribe(
      (response) => {
        console.log('Seat layout updated:', response);
        this.loadSeatLayouts();
      },
      (error) => {
        console.error('Error updating seat layout:', error);
      }
    );
  }

  deleteSeatLayout(layout: ISeatLayout) {
    this.seatLayoutModalService.openDeleteConfirmationModal(layout.layoutName).subscribe(result => {
      if (result) {
        this.seatLayoutService.deleteSeatLayout(layout._id).subscribe(
          () => {
            console.log('Seat layout deleted successfully');
            this.loadSeatLayouts();
          },
          (error) => {
            console.error('Error deleting seat layout:', error);
          }
        );
      }
    });
  }
}