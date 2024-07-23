import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { ModalComponent } from '../../../shared/reusable/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-routes',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './add-routes.component.html',
  styleUrl: './add-routes.component.css'
})
export class AddRoutesComponent {

  routesData = [
    { name: 'Calicut to Kannur', startingPoint: 'Calicut', endingPoint: 'Kannur', distance: '93 KM', time: '8 Hour', status: 'Active' }
  ];

  routesColumns = [
    { key: 'name', label: 'NAME' },
    { key: 'startingPoint', label: 'STARTING POINT' },
    { key: 'endingPoint', label: 'ENDING POINT' },
    { key: 'distance', label: 'DISTANCE' },
    { key: 'time', label: 'TIME' },
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
        title: 'Add Route',
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
    this.routesData.push({ ...formData, status: 'Active' });
  }
}