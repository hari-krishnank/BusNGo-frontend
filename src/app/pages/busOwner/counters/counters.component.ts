import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { counterModalFields } from '../../../shared/configs/busOwner/counterForm-config';
import { countersData } from '../../../shared/data/busOwner/counters/counters-data';
import { countersColumns } from '../../../shared/data/busOwner/counters/counters-columns';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, CommonModule, ModalComponent, CommonModule],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.css'
})
export class CountersComponent {
  countersData = countersData;
  countersColumns = countersColumns;
  modalFields: ModalFormField[] = counterModalFields;

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