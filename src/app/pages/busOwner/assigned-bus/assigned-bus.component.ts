import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusable/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-assigned-bus',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './assigned-bus.component.html',
  styleUrl: './assigned-bus.component.css'
})
export class AssignedBusComponent {
  assignedBusData = [
    { trip: 'AC - Calicut to Kannur Bus', busNickName: 'Emerald Travels', regNo: 'KL-15-A-1234', status: 'Active' }
  ];

  assignedBusColumns = [
    { key: 'trip', label: 'TRIP' },
    { key: 'busNickName', label: 'BUS NICK NAME' },
    { key: 'regNo', label: 'REGISTER NUMBER' },
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
        title: 'Assign Trip to the Buses',
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
    this.assignedBusData.push({ ...formData, status: 'Active' });
  }
}
