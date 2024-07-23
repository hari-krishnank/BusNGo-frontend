import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusable/modal/modal.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent {
  
  amenitiesData = [
    { slNo: 1, title: 'Water Bottle', icon: '🍶' },
    { slNo: 2, title: 'Pillow', icon: '🛏️' },
  ];

  amenitiesColumns = [
    { key: 'slNo', label: 'SI NO' },
    { key: 'title', label: 'TITLE' },
    { key: 'icon', label: 'ICON' },
  ];


  modalFields: ModalFormField[] = [
    { name: 'title', placeholder: 'Enter Title', type: 'text', errors: [] },
    {
      name: 'icon', placeholder: 'Select Icon', type: 'select', errors: [], options: [
        { value: 'icon1', label: 'Icon 1' },
        { value: 'icon2', label: 'Icon 2' }
      ]
    },
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
    this.amenitiesData.push({ ...formData, status: 'Active' });
  }
}
