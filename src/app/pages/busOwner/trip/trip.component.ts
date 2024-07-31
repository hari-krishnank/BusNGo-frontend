import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { tripData } from '../../../shared/data/busOwner/trip/trip-data';
import { tripColumns } from '../../../shared/data/busOwner/trip/trip-column';
import { tripModalFields } from '../../../shared/configs/busOwner/tripForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit{
  tripData = tripData
  tripColumns = tripColumns
  modalFields: ModalFormField[] = tripModalFields
  tripForm !: FormGroup

  constructor(private dialog: MatDialog, private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.createTripForm()
  }

  createTripForm() {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      fleetType: ['', Validators.required],
      route: ['', Validators.required],
      schedule: ['', Validators.required],
      startFrom: ['', Validators.required],
      endTo: ['', Validators.required],
      dayOff: ['', Validators.required]
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Trip',
        fields: this.modalFields,
        form: this.tripForm,
        submitButtonText: 'Add Trip'
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
    this.tripData.push({ ...formData, status: 'Active' });
  }
}