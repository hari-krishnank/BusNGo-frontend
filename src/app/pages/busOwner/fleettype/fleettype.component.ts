import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { fleetTypesData } from '../../../shared/data/busOwner/fleetTypes/fleetType-data';
import { fleetTypesColumns } from '../../../shared/data/busOwner/fleetTypes/fleetType-columns';
import { fleetTypeModalFields } from '../../../shared/configs/busOwner/fleetTypeForm-config';

@Component({
  selector: 'app-fleettype',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './fleettype.component.html',
  styleUrl: './fleettype.component.css'
})
export class FleettypeComponent {
  fleetTypesData = fleetTypesData;
  fleetTypesColumns = fleetTypesColumns;
  modalFields: ModalFormField[] = fleetTypeModalFields

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