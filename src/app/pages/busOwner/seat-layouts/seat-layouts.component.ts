import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { seatLayoutmodalFields } from '../../../shared/configs/busOwner/seatLayoutsForm-config';
import { seatLayoutsColumns } from '../../../shared/data/busOwner/seatLayout-columns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatPreviewComponent } from '../seat-preview/seat-preview.component';
import { SeatLayoutService } from '../../../core/services/busOwner/seat-layout/seat-layout.service';
import { SeatPreviewModalComponent } from '../seat-preview-modal/seat-preview-modal.component';
import { ConfirmDialogComponent } from '../../../shared/reusableComponents/confirm-dialog/confirm-dialog.component';
import { noWhitespaceValidator } from '../../../shared/validators/validators';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';

@Component({
  selector: 'app-seat-layouts',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent, SeatPreviewComponent],
  templateUrl: './seat-layouts.component.html',
  styleUrl: './seat-layouts.component.css'
})
export class SeatLayoutsComponent implements OnInit {
  seatLayoutsData: any[] = [];
  seatLayoutsColumns = seatLayoutsColumns;
  modalFields: ModalFormField[] = seatLayoutmodalFields;
  selectedSeats: string[] = [];

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private seatLayoutService: SeatLayoutService) { }

  ngOnInit() {
    this.loadSeatLayouts();
  }

  loadSeatLayouts() {
    this.seatLayoutService.getAllSeatLayouts().subscribe(
      (layouts) => {
        this.seatLayoutsData = layouts.map((layout, index) => ({
          ...layout,
          siNo: index + 1,
          selectedSeats: layout.selectedSeats || [],
          totalSeats: this.calculateTotalSeats(layout)
        }));
      },
      (error) => {
        console.error('Error loading seat layouts:', error);
      }
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: {
        title: 'Add Layouts',
        fields: this.modalFields,
        form: this.createLayoutsForm(),
        submitButtonText: 'Add Seat Layout'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveSeatLayout(result);
      }
    });
  }

  calculateTotalSeats(layout: any): number {
    return layout.selectedSeats ? layout.selectedSeats.length : 0;
  }

  createLayoutsForm(layout?: any): FormGroup {
    return this.formBuilder.group({
      layoutName: [layout?.layoutName || '', Validators.required],
      rows: [layout?.rows || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      columns: [layout?.columns || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      status: [layout ? layout.status : '', [Validators.required, noWhitespaceValidator()]],
      upperDeck: [layout?.upperDeck || false]
    });
  }

  saveSeatLayout(formData: any) {
    console.log('Saving seat layout:', formData);
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

  onViewPreview(layout: any) {
    this.dialog.open(SeatPreviewModalComponent, {
      width: '500px',
      data: layout
    });
  }

  editSeatLayout(layout: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: {
        title: 'Edit Layout',
        fields: this.modalFields,
        form: this.createLayoutsForm(layout),
        submitButtonText: 'Update Seat Layout',
        existingLayout: layout
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateSeatLayout(layout._id, result);
      }
    });
  }

  updateSeatLayout(id: string, formData: any) {
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

  deleteSeatLayout(layout: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Seat Layout',
        message: `Are you sure you want to delete the seat layout "${layout.layoutName}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
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