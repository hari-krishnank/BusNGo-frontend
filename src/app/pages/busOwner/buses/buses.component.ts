import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { busesColumns } from '../../../shared/data/busOwner/buses/buses-columns';
import { addBusmodalFields } from '../../../shared/configs/busOwner/addBusForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from '../../../core/services/busOwner/add-bus.service';
import { FleetTypeService } from '../../../core/services/busOwner/fleet-type.service';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, ModalComponent, CommonModule, MatDialogModule],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.css'
})
export class BusesComponent implements OnInit {
  busesData: any[] = [];
  busesColumns = busesColumns
  busForm!: FormGroup;
  fleetTypes: any[] = [];

  modalFields: ModalFormField[] = addBusmodalFields

  constructor(private dialog: MatDialog, private fb: FormBuilder, private busService: BusService, private fleetTypeService: FleetTypeService) { }

  ngOnInit() {
    this.createBusForm();
    this.loadBuses();
    this.loadFleetTypes();
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

  loadBuses() {
    this.busService.getAllBuses().subscribe(
      data => {
        this.busesData = data.map(bus => ({
          ...bus,
          fleetTypeName: bus.FleetType?.name || 'N/A'
        }));
      },
      error => console.error('Error loading buses:', error)
    );
  }

  loadFleetTypes() {
    this.fleetTypeService.getAllFleetTypes().subscribe(
      data => {
        this.fleetTypes = data;
        this.updateFleetTypeOptions();
      },
      error => console.error('Error loading fleet types:', error)
    );
  }

  updateFleetTypeOptions() {
    const fleetTypeField = this.modalFields.find(field => field.name === 'FleetType');
    if (fleetTypeField) {
      fleetTypeField.options = this.fleetTypes.map(ft => ({ value: ft._id, label: ft.name }));
    }
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

  saveBus(formData: any) {
    this.busService.addBus(formData).subscribe(
      newBus => {
        console.log('New bus added:', newBus);
        this.busesData.push(newBus);
        this.loadBuses();
      },
      error => console.error('Error adding bus:', error)
    );
  }
}