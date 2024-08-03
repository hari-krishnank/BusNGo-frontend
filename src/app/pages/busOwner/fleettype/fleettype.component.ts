import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { fleetTypesColumns } from '../../../shared/data/busOwner/fleetTypes/fleetType-columns';
import { fleetTypeModalFields } from '../../../shared/configs/busOwner/fleetTypeForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AmenitiesService } from '../../../core/services/busOwner/amenities/amenities.service';
import { SeatPreviewComponent } from '../seat-preview/seat-preview.component';
import { FleetTypeService } from '../../../core/services/busOwner/fleet-type/fleet-type.service';
import { SeatLayoutService } from '../../../core/services/busOwner/seat-layout/seat-layout.service';

@Component({
  selector: 'app-fleettype',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, SeatPreviewComponent],
  templateUrl: './fleettype.component.html',
  styleUrl: './fleettype.component.css'
})
export class FleettypeComponent implements OnInit {
  fleetTypesData: any[] = [];
  fleetTypesColumns = fleetTypesColumns;
  modalFields: ModalFormField[] = fleetTypeModalFields;
  amenities: any[] = [];
  seatLayouts: any[] = [];

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private fleetTypeService: FleetTypeService,
    private amenitiesService: AmenitiesService,
    private seatLayoutService: SeatLayoutService
  ) { }

  ngOnInit(): void {
    this.loadFleetTypes();
    this.loadFormOptions();
  }

  loadFormOptions() {
    forkJoin({
      amenities: this.amenitiesService.getAllAmenities(),
      seatLayouts: this.seatLayoutService.getAllSeatLayouts()
    }).subscribe(
      ({ amenities, seatLayouts }) => {
        this.amenities = amenities;
        this.seatLayouts = seatLayouts;
        this.updateModalFields();
        this.loadFleetTypes();
      },
      error => console.error('Error loading form options:', error)
    );
  }

  updateModalFields() {
    this.modalFields = this.modalFields.map(field => {
      if (field.name === 'seatLayout') {
        field.type = 'select';
        field.options = this.seatLayouts.map(layout => ({ value: layout._id, label: layout.layoutName }));
      } else if (field.name === 'facilities') {
        field.type = 'select';
        field.options = this.amenities.map(amenity => ({ value: amenity._id, label: amenity.title }));
        console.log(field.options);
      }
      return field;
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Fleet Type',
        fields: this.modalFields,
        form: this.createFleetTypeForm(),
        submitButtonText: 'Add Fleet Type'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveFleetType(result);
      }
    });
  }

  createFleetTypeForm(): FormGroup {
    const form: { [key: string]: any } = {};

    this.modalFields.forEach(field => {
      if (field.type === 'toggle') {
        form[field.name] = [false];
      } else if (field.type === 'multiselect') {
        form[field.name] = [[], Validators.required];
      } else {
        form[field.name] = ['', Validators.required];
      }
    });

    return this.formBuilder.group(form);
  }

  loadFleetTypes() {
    this.fleetTypeService.getAllFleetTypes().subscribe(
      (data) => {
        this.fleetTypesData = data.map(fleetType => ({
          ...fleetType,
          facilities: this.mapAmenityIdsToTitles(fleetType.facilities),
          seatLayout: this.getSeatLayoutNameById(fleetType.seatLayout)
        }));
      },
      (error) => {
        console.error('Error loading fleet types:', error);
      }
    );
  }

  getSeatLayoutById(layoutId: string) {
    return this.seatLayouts.find(layout => layout._id === layoutId);
  }

  getSeatLayoutNameById(layoutId: string): string {
    const layout = this.seatLayouts.find(layout => layout._id === layoutId);
    return layout ? layout.layoutName : 'Unknown Layout';
  }

  mapAmenityIdsToTitles(amenityIds: string[]): string {
    return amenityIds.map(id => {
      const amenity = this.amenities.find(a => a._id === id);
      return amenity ? amenity.title : id;
    }).join(', ');
  }

  saveFleetType(formData: any) {
    this.fleetTypeService.createFleetType(formData).subscribe(
      (response: any) => {
        console.log('New fleet type:', response);
        const newFleetType = {
          ...response,
          facilities: this.mapAmenityIdsToTitles(response.facilities),
          seatLayout: this.getSeatLayoutNameById(response.seatLayout)
        };
        this.fleetTypesData = [...this.fleetTypesData, newFleetType];
      },
      (error) => {
        console.error('Error adding fleet type:', error);
      }
    );
  }
}