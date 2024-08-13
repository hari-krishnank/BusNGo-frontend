import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { assignedBusColumns } from '../../../shared/data/busOwner/assignBus-column';
import { assignedBusModalFields } from '../../../shared/configs/busOwner/assignBusForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from '../../../core/services/busOwner/add-bus/add-bus.service';
import { AssignedBusService } from '../../../core/services/busOwner/assigned-bus/assigned-bus.service';
import { TripService } from '../../../core/services/busOwner/trip/trip.service';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';

@Component({
  selector: 'app-assigned-bus',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent],
  templateUrl: './assigned-bus.component.html',
  styleUrl: './assigned-bus.component.css'
})
export class AssignedBusComponent implements OnInit {
  assignedBusData: any[] = [];
  assignedBusColumns = assignedBusColumns;
  modalFields: ModalFormField[] = assignedBusModalFields;
  assignBusForm!: FormGroup;
  trips: any[] = [];
  buses: any[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private assignedBusService: AssignedBusService,
    private tripService: TripService,
    private busService: BusService
  ) { }

  ngOnInit(): void {
    this.createAssignBusForm();
    this.loadAssignedBuses();
    this.loadTrips();
    this.loadBuses();
  }

  createAssignBusForm() {
    this.assignBusForm = this.fb.group({
      trip: ['', Validators.required],
      bus: ['', Validators.required]
    });
  }

  loadAssignedBuses() {
    this.assignedBusService.getAllAssignedBuses().subscribe(
      data => {
        this.assignedBusData = data;
        console.log('Assigned bus data:', this.assignedBusData);
      },
      error => {
        console.error('Error loading assigned buses:', error);
      }
    );
  }

  loadTrips() {
    this.tripService.getAllTrips().subscribe(
      (trips) => {
        console.log('Load Trips : ', trips);

        const tripsField = this.modalFields.find(field => field.name === 'trip')
        if (tripsField) {
          tripsField.options = trips.map(trip => ({ value: trip._id, label: `${trip.startFrom.name} to ${trip.endTo.name}` }))
        }
      },
      (error) => {
        console.error('Error loading trips:', error);
      }
    );
  }

  loadBuses() {
    this.busService.getAllBuses().subscribe(
      (buses) => {
        console.log('Load Buses:', buses);

        const busesField = this.modalFields.find(field => field.name === 'bus')
        if (busesField) {
          busesField.options = buses.map(buses => ({ value: buses._id, label: buses.name }))
        }
      },
      (error) => {
        console.error('Error loading buses:', error);
      }
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Assign Trip to the Buses',
        fields: this.modalFields,
        form: this.assignBusForm,
        submitButtonText: 'Assign Trip to Bus'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveBus(result);
      }
    });
  }

  saveBus(formData: any) {
    this.assignedBusService.assignBusToTrip(formData.trip, formData.bus).subscribe(
      response => {
        console.log('Bus assigned successfully:', response);
        this.loadAssignedBuses();
      },
      error => {
        console.error('Error assigning bus:', error);
      }
    );
  }
}