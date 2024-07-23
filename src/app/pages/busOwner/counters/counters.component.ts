import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/reusable/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, CommonModule, ModalComponent, CommonModule],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.css'
})
export class CountersComponent {

  countersData = [
    { name: 'Calicut', mobileNumber: '7994673892', city: 'Calicut', location: 'Calicut', status: 'Active' },
    { name: 'Kannur', mobileNumber: '9562648963', city: 'Kannur', location: 'Kannur', status: 'Active' },
  ];

  countersColumns = [
    { key: 'name', label: 'Name' },
    { key: 'mobileNumber', label: 'MOBILE NUMBER' },
    { key: 'city', label: 'CITY' },
    { key: 'location', label: 'LOCATION' },
    { key: 'status', label: 'STATUS' },
  ];

  modalFields: ModalFormField[] = [
    { name: 'name', placeholder: 'Enter Counter Name', type: 'text', errors: [] },
    { name: 'city', placeholder: 'Enter City Name', type: 'text', errors: [] },
    { name: 'location', placeholder: 'Enter City Location', type: 'text', errors: [] },
    { name: 'mobileNumber', placeholder: 'Enter Counter Contact Number', type: 'text', errors: [] },
  ];

  constructor(private dialog: MatDialog) { }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Counter',
        fields: this.modalFields
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCounter(result);
      }
    });
  }

  saveCounter(formData: any) {
    console.log('New counter:', formData);
    this.countersData.push({ ...formData, status: 'Active' });
  }
}