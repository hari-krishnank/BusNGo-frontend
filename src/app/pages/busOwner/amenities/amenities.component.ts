import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { amenitiesModalFields } from '../../../shared/configs/busOwner/amenitiesForm-config';
import { amenitiesData } from '../../../shared/data/busOwner/amenities/amenities-data';
import { amenitiesColumns } from '../../../shared/data/busOwner/amenities/amenities-columns';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent {
  amenitiesData = amenitiesData;
  amenitiesColumns = amenitiesColumns
  modalFields: ModalFormField[] = amenitiesModalFields;

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
    this.amenitiesData.push({ ...formData, status: 'Active' });
  }
}