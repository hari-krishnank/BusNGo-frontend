import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusable/modal/modal.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, ModalComponent, CommonModule, MatDialogModule],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.css'
})
export class BusesComponent {

  busesData = [
    { name: 'Emerald Travels', regNo: 'KL-15-A-1234', engineNo: 'D6CH-345678', chasisNo: 'YV3T2U528EA123456', ModelNo: 'Emerald-VIP-2024', FleetType: 'AC', status: 'Active' }
  ];

  busesColumns = [
    { key: 'name', label: 'NAME' },
    { key: 'regNo', label: 'REGISTER NUMBER' },
    { key: 'engineNo', label: 'ENGINE NUMBER' },
    { key: 'chasisNo', label: 'CHASIS NUMBER' },
    { key: 'ModelNo', label: 'MODEL NUMBER' },
    { key: 'FleetType', label: 'FLEET TYPE' },
    { key: 'status', label: 'STATUS' },
  ];

  modalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Nick Name', type: 'text', errors: [] },
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
        title: 'Add Bus',
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
    this.busesData.push({ ...formData, status: 'Active' });
  }
}