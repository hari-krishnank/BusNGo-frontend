import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusable/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-fleettype',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './fleettype.component.html',
  styleUrl: './fleettype.component.css'
})
export class FleettypeComponent {
  fleetTypesData = [
    { name: 'AC', layout: '1 x 2', deck: '1', seats: '40', facilities: 'Water bottle', status: 'Active' },
    { name: 'Coach', layout: '1 x 2', deck: '1', seats: '40', facilities: 'Water bottle', status: 'Active' },
  ];

  fleetTypesColumns = [
    { key: 'name', label: 'NAME' },
    { key: 'layout', label: 'SEAT LAYOUT' },
    { key: 'deck', label: 'NO DECK' },
    { key: 'seats', label: 'TOTAL SEATS' },
    { key: 'facilities', label: 'FACILITIES' },
    { key: 'status', label: 'STATUS' },
  ];

  modalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Name', type: 'text', errors: [] },
    { name: 'seatLayout', placeholder: 'Enter Seat Layout', type: 'text', errors: [] },
    { name: 'noDeck', placeholder: 'Enter No Deck', type: 'text', errors: [] },
    { name: 'totalSeats', placeholder: 'Enter Total Seats', type: 'text', errors: [] },
    { name: 'facilities', placeholder: 'Enter Facilities', type: 'text', errors: [] },
    {
      name: 'status', placeholder: 'Select Status', type: 'select', errors: [], options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
      ]
    }
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
    this.fleetTypesData.push({ ...formData, status: 'Active' });
  }
}
