import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { tripColumns } from '../../../shared/data/busOwner/trip-column';
import { tripModalFields } from '../../../shared/configs/busOwner/tripForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../../core/services/busOwner/trip/trip.service';
import { FleetTypeService } from '../../../core/services/busOwner/fleet-type/fleet-type.service';
import { RouteService } from '../../../core/services/busOwner/add-routes/add-route.service';
import { ScheduleService } from '../../../core/services/busOwner/schedule/schedule.service';
import { CounterService } from '../../../core/services/busOwner/counters/counter.service';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit {
  tripData: any[] = []
  tripColumns = tripColumns
  modalFields: ModalFormField[] = tripModalFields
  tripForm !: FormGroup

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private tripService: TripService,
    private fleetTypeService: FleetTypeService,
    private routeService: RouteService,
    private scheduleService: ScheduleService,
    private counterService: CounterService
  ) { }

  ngOnInit(): void {
    this.createTripForm()
    this.loadTrips()
    this.loadFleetTypes()
    this.loadRoutes()
    this.loadSchedules()
    this.loadStartFrom()
    this.loadEndTo()
    this.loadDayOff()
  }

  createTripForm() {
    this.tripForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      fleetType: ['', Validators.required],
      route: ['', Validators.required],
      schedule: ['', Validators.required],
      startFrom: ['', Validators.required],
      endTo: ['', Validators.required],
      dayOff: [[], Validators.required]
    });
  }

  loadTrips() {
    this.tripService.getAllTrips().subscribe(
      (data: any[]) => {
        this.tripData = data.map(trip => ({
          ...trip,
          AcOrNonAc: trip.fleetType && trip.fleetType.name ? trip.fleetType.name : 'N/A',
          route: trip.route && trip.route.name ? trip.route.name : 'N/A',
          dayOff: Array.isArray(trip.dayOff) ? trip.dayOff.join(', ') : trip.dayOff,
        }));
      },
      (error) => {
        console.error('Error loading ticket prices:', error);
      }
    );
  }

  loadFleetTypes() {
    this.fleetTypeService.getAllFleetTypes().subscribe(
      (fleetTypes) => {
        const fleetTypeField = this.modalFields.find(field => field.name === 'fleetType');
        if (fleetTypeField) {
          fleetTypeField.options = fleetTypes.map(ft => ({ value: ft._id, label: ft.name }));
        }
      },
      (error) => {
        console.error('Error loading fleet types:', error);
      }
    );
  }

  loadRoutes() {
    this.routeService.getRoutes().subscribe(
      (routes) => {
        const routeField = this.modalFields.find(field => field.name === 'route');
        if (routeField) {
          routeField.options = routes.map(r => ({ value: r._id, label: r.name }));
        }
      },
      (error) => {
        console.error('Error loading routes:', error);
      }
    );
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe(
      (schedules) => {
        const scheduleField = this.modalFields.find(field => field.name === 'schedule')
        if (scheduleField) {
          scheduleField.options = schedules.map(sche => ({ value: sche._id, label: `${sche.startFrom} - ${sche.end}` }))
        }
      },
      (error) => {
        console.error('Error handling Schedules:', error);
      }
    )
  }

  loadStartFrom() {
    this.counterService.getCounters().subscribe(
      (counters) => {
        const counterField = this.modalFields.find(field => field.name === 'startFrom')
        if (counterField) {
          counterField.options = counters.map(counter => ({ value: counter._id, label: counter.name }))
        }
      },
      (error) => {
        console.error('Error loading routes:', error);
      }
    )
  }

  loadEndTo() {
    this.counterService.getCounters().subscribe(
      (counters) => {
        const counterField = this.modalFields.find(field => field.name === 'endTo')
        if (counterField) {
          counterField.options = counters.map(counter => ({ value: counter._id, label: counter.name }))
        }
      },
      (error) => {
        console.error('Error loading routes:', error);
      }
    )
  }

  loadDayOff() {
    const dayOffField = this.modalFields.find(field => field.name === 'dayOff');
    if (dayOffField) {
      dayOffField.options = [
        { value: 'Sunday', label: 'Sunday' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' }
      ];
    }
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
        this.saveTrip(result);
      }
    });
  }

  saveTrip(formData: any) {
    this.tripService.createTrip(formData).subscribe(
      (newTrip) => {
        console.log('New trip added:', newTrip);
        this.loadTrips();
      },
      (error) => {
        console.error('Error adding new trip:', error);
      }
    );
  }

  resetForm() {
    this.tripForm.reset()
  }
}