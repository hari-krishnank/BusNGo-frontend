import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { busesData } from '../../../shared/data/busOwner/buses/buses-data';
import { busesColumns } from '../../../shared/data/busOwner/buses/buses-columns';
import { addBusmodalFields } from '../../../shared/configs/busOwner/addBusForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, ModalComponent, CommonModule, MatDialogModule],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.css'
})
export class BusesComponent implements OnInit {
  busesData = busesData
  busesColumns = busesColumns
  busForm!: FormGroup;

  modalFields: ModalFormField[] = addBusmodalFields

  constructor(private dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.createBusForm();
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Bus',
        fields: this.modalFields,
        form: this.busForm,
        submitButtonText: 'Save Bus'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveBus(result);
      }
    });
  }


  createBusForm() {
    this.busForm = this.fb.group({
      name: ['', Validators.required],
      FleetType: ['', Validators.required],
      regNo: ['', Validators.required],
      engineNo: ['', Validators.required],
      chasisNo: ['', Validators.required],
      ModelNo: ['', Validators.required]
    });
  }

  saveBus(formData: any) {
    console.log('New bus:', formData);
    this.busesData.push({ ...formData, status: 'Active' });
  }
}