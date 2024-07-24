import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent {
  tripData = [
    { title: 'AC - Calicut to Kannur Bus', AcOrNonAc: 'Non - AC', dayOff: 'Sunday', status: 'Active' }
  ];

  tripColumns = [
    { key: 'title', label: 'TITLE' },
    { key: 'AcOrNonAc', label: 'AC / NON - AC' },
    { key: 'dayOff', label: 'DAY OFF' },
    { key: 'status', label: 'STATUS' },
  ];

  modalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Route Name', type: 'text', errors: [] },
    {
      name: 'FleetType', placeholder: 'Select Fleet Type', type: 'select', errors: [], options: [
        { value: 'AC', label: 'AC' },
        { value: 'Non-AC', label: 'Non-AC' }
      ]
    },
    { name: 'regNo', placeholder: 'Enter Reg No', type: 'text', errors: [] },
    { name: 'engineNo', placeholder: 'Enter Engine No.', type: 'text', errors: [] },
    { name: 'chasisNo', placeholder: 'Enter Chasis No.', type: 'text', errors: [] },
    { name: 'ModelNo', placeholder: 'Enter Model No.', type: 'text', errors: [] },
  ];

  constructor(private dialog: MatDialog) { }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Trip',
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
    this.tripData.push({ ...formData, status: 'Active' });
  }
}
