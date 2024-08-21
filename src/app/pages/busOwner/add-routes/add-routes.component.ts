import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { addRouteModalFields } from '../../../shared/configs/busOwner/addRoutesForm-config';
import { routesColumns } from '../../../shared/data/busOwner/routes-columns';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CounterService } from '../../../core/services/busOwner/counters/counter.service';
import { RouteService } from '../../../core/services/busOwner/add-routes/add-route.service';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { ScheduleService } from '../../../core/services/busOwner/schedule/schedule.service';

@Component({
  selector: 'app-add-routes',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent],
  templateUrl: './add-routes.component.html',
  styleUrl: './add-routes.component.css'
})
export class AddRoutesComponent implements OnInit {
  routesData: any[] = []
  routesColumns = routesColumns
  modalFields: ModalFormField[] = addRouteModalFields
  routeForm!: FormGroup;
  counters: any[] = [];

  constructor(private dialog: MatDialog, private fb: FormBuilder, private routeService: RouteService, private counterService: CounterService, private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.createRouteForm();
    this.loadRoutes();
    this.loadCounters();
    this.loadSchedules()
  }

  createRouteForm() {
    this.routeForm = this.fb.group({
      name: ['', Validators.required],
      schedule: ['', Validators.required],
      startingPoint: ['', Validators.required],
      endingPoint: ['', Validators.required],
      hasMoreStoppage: [false],
      additionalStops: this.fb.array([]),
      additionalStopsTime: this.fb.array([]),
      distance: ['', [Validators.required, Validators.min(0)]],
      time: ['', Validators.required],
      status: ['', Validators.required]
    });

    this.routeForm.get('hasMoreStoppage')?.valueChanges.subscribe(hasMore => {
      const additionalStopsArray = this.routeForm.get('additionalStops') as FormArray;
      const additionalStopsTimeArray = this.routeForm.get('additionalStopsTime') as FormArray;
      if (hasMore) {
        additionalStopsArray.push(this.fb.control('', Validators.required));
        additionalStopsTimeArray.push(this.fb.control('', Validators.required));
      } else {
        additionalStopsArray.clear();
        additionalStopsTimeArray.clear()
      }
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Route',
        fields: this.modalFields,
        form: this.routeForm,
        submitButtonText: 'Save Route'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveRoute(result);
      }
    });
  }

  loadRoutes() {
    this.routeService.getRoutes().subscribe(
      (routes) => {
        this.routesData = routes.map(route => ({
          ...route,
          startingPoint: route.startingPoint && route.startingPoint.name ? route.startingPoint.name : 'N/A',
          endingPoint: route.endingPoint && route.endingPoint.name ? route.endingPoint.name : 'N/A'
        }));
      },
      (error) => {
        console.error('Error loading routes:', error);
      }
    );
  }

  loadCounters() {
    this.counterService.getAllCounters().subscribe(
      (counters) => {
        this.counters = counters;
        this.updateCounterOptions();
      },
      (error) => {
        console.error('Error loading counters:', error);
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

  updateCounterOptions() {
    const counterOptions = this.counters.map(counter => ({
      value: counter._id,
      label: counter.name
    }));

    this.modalFields.forEach(field => {
      if (['startingPoint', 'endingPoint', 'additionalStops'].includes(field.name)) {
        field.options = counterOptions;
      }
    });
  }

  saveRoute(formData: any) {
    const transformedFormData = {
      ...formData,
      additionalStops: formData.additionalStops.map((stop: any) => ({
        stop: stop,
        reachingTime: formData.additionalStopsTime[formData.additionalStops.indexOf(stop)]
      }))
    };

    this.routeService.addRoute(transformedFormData).subscribe(
      (newRoute) => {
        console.log('New route added:', newRoute);
        this.routesData = [...this.routesData, newRoute];
        this.resetForm();
      },
      (error) => {
        console.error('Error adding route:', error);
      }
    );
  }

  resetForm() {
    this.routeForm.reset();

    this.routeForm.patchValue({
      hasMoreStoppage: false
    });
    const additionalStopsArray = this.routeForm.get('additionalStops') as FormArray;
    additionalStopsArray.clear();
  }
}