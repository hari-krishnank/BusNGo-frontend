import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';

@Component({
  selector: 'app-ticket-price',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './ticket-price.component.html',
  styleUrl: './ticket-price.component.css'
})
export class TicketPriceComponent {
  ticketsData = [
    { fleetType: 'AC', route: 'Calicut to Kannur', price: '900 /-' }
  ];

  ticketsColumns = [
    { key: 'fleetType', label: 'FLEET TYPE' },
    { key: 'route', label: 'ROUTE' },
    { key: 'price', label: 'PRICE' },
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
        title: 'Add Ticket Price',
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
    this.ticketsData.push({ ...formData, status: 'Active' });
  }
}
