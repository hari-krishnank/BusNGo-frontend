import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { seatLayoutmodalFields } from '../../../shared/configs/busOwner/seatLayoutsForm-config';
import { seatLayoutsData } from '../../../shared/data/busOwner/seatLayouts/seatLayout-data';
import { seatLayoutsColumns } from '../../../shared/data/busOwner/seatLayouts/seatLayout-columns';

@Component({
  selector: 'app-seat-layouts',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './seat-layouts.component.html',
  styleUrl: './seat-layouts.component.css'
})
export class SeatLayoutsComponent {
  seatLayoutsData = seatLayoutsData;
  seatLayoutsColumns = seatLayoutsColumns;
  modalFields: ModalFormField[] = seatLayoutmodalFields

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