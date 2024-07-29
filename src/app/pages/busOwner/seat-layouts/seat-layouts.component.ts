import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { seatLayoutmodalFields } from '../../../shared/configs/busOwner/seatLayoutsForm-config';
import { seatLayoutsData } from '../../../shared/data/busOwner/seatLayouts/seatLayout-data';
import { seatLayoutsColumns } from '../../../shared/data/busOwner/seatLayouts/seatLayout-columns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeatPreviewComponent } from '../seat-preview/seat-preview.component';
import { SeatLayoutService } from '../../../core/services/busOwner/seat-layout.service';

@Component({
  selector: 'app-seat-layouts',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, SeatPreviewComponent],
  templateUrl: './seat-layouts.component.html',
  styleUrl: './seat-layouts.component.css'
})
export class SeatLayoutsComponent implements OnInit {

  seatLayoutsData: any[] = [];
  seatLayoutsColumns = seatLayoutsColumns;
  modalFields: ModalFormField[] = seatLayoutmodalFields;
  selectedSeats: string[] = [];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private seatLayoutService: SeatLayoutService
  ) { }

  ngOnInit() {
    this.loadSeatLayouts();
  }

  loadSeatLayouts() {
    this.seatLayoutService.getAllSeatLayouts().subscribe(
      (layouts) => {
        this.seatLayoutsData = layouts;
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

  createLayoutsForm(layout?: any): FormGroup {
    return this.formBuilder.group({
      driverSeatPosition: [layout?.driverSeatPosition || '', Validators.required],
      rows: [layout?.rows || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      columns: [layout?.columns || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      upperDeck: [layout?.upperDeck || false]
    });
  }

  saveSeatLayout(formData: any) {
    console.log('Saving seat layout:', formData);
    const seatLayoutData = {
      ...formData,
      selectedSeats: this.selectedSeats
    };

    this.seatLayoutService.createSeatLayout(seatLayoutData).subscribe(
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
}