import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusable/modal/modal.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-seat-layouts',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './seat-layouts.component.html',
  styleUrl: './seat-layouts.component.css'
})
export class SeatLayoutsComponent {
  seatLayoutsData = [
    { slNo: 1, DriverSeat: 'Right', rows: '12', columns: '4' },
    { slNo: 2, DriverSeat: 'Left', rows: '12', columns: '4' },
  ];

  seatLayoutsColumns = [
    { key: 'slNo', label: 'SI NO', },
    { key: 'DriverSeat', label: 'DRIVER SEAT POSITION' },
    { key: 'rows', label: 'ROWS' },
    { key: 'columns', label: 'COLUMNS' },
  ];


  modalFields: ModalFormField[] = [
    {
      name: 'driverSeatPosition', placeholder: 'Select Driver Seat Position', type: 'select', errors: [], options: [
        { value: 'Right', label: 'Right' },
        { value: 'Left', label: 'Left' }
      ]
    },
    { name: 'rows', placeholder: 'Enter Rows', type: 'text', errors: [] },
    { name: 'columns', placeholder: 'Enter Columns', type: 'text', errors: [] }
  ];


  constructor(private dialog: MatDialog) { }


  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Amenities',
        fields: this.modalFields
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveBus(result);
      }
    });
  }

  saveBus(formData: any) {
    console.log('New bus:', formData);
    this.seatLayoutsData.push({ ...formData, status: 'Active' });
  }
}
