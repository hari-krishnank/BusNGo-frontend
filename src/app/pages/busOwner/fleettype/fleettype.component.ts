import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { fleetTypesColumns } from '../../../shared/data/busOwner/fleetType-columns';
import { fleetTypeModalFields } from '../../../shared/configs/busOwner/fleetTypeForm-config';
import { SeatPreviewComponent } from '../seat-preview/seat-preview.component';
import { FleetTypeService } from '../../../core/services/busOwner/fleet-type/fleet-type.service';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { FleetTypeFormService } from '../../../core/services/busOwner/fleet-type/fleet-type-form.service';
import { FleetTypeModalService } from '../../../core/services/busOwner/fleet-type/fleet-type-modal.service';
import { IFleetType } from '../../../core/models/busOwner/fleet-type.interface';

@Component({
  selector: 'app-fleettype',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent, SeatPreviewComponent],
  templateUrl: './fleettype.component.html',
  styleUrl: './fleettype.component.css'
})
export class FleettypeComponent implements OnInit {
  fleetTypesData: IFleetType[] = [];
  fleetTypesColumns = fleetTypesColumns;
  modalFields: ModalFormField[] = fleetTypeModalFields;

  constructor(private fleetTypeService: FleetTypeService, private fleetTypeFormService: FleetTypeFormService, private fleetTypeModalService: FleetTypeModalService) { }

  ngOnInit(): void {
    this.loadFleetTypes();
    this.loadFormOptions();
  }

  loadFormOptions() {
    this.fleetTypeFormService.loadFormOptions().subscribe(
      ({ amenities, seatLayouts }) => {
        this.fleetTypeFormService.setAmenities(amenities);
        this.fleetTypeFormService.setSeatLayouts(seatLayouts);
        this.updateModalFields();
        this.loadFleetTypes();
      },
      error => console.error('Error loading form options:', error)
    );
  }

  updateModalFields() {
    this.modalFields = this.fleetTypeFormService.updateModalFields(this.modalFields);
  }

  openModal() {
    const form = this.fleetTypeFormService.createFleetTypeForm(this.modalFields);
    this.fleetTypeModalService.openModal('Add Fleet Type', this.modalFields, form, 'Add Fleet Type')
      .subscribe(result => {
        if (result) {
          this.saveFleetType(result);
        }
      });
  }

  loadFleetTypes() {
    this.fleetTypeService.getAllFleetTypes().subscribe(
      (data) => {
        this.fleetTypesData = data.map(fleetType => ({
          ...fleetType,
          facilities: this.fleetTypeFormService.mapAmenityIdsToTitles(fleetType.facilities as string[]),
          seatLayout: this.fleetTypeFormService.getSeatLayoutNameById(fleetType.seatLayout)
        }));
        console.log('fleet Types Loaded:', this.fleetTypesData);
      },
      (error) => {
        console.error('Error loading fleet types:', error);
      }
    );
  }

  saveFleetType(formData: Partial<IFleetType>) {
    this.fleetTypeService.createFleetType(formData).subscribe(
      (response: IFleetType) => {
        const newFleetType = {
          ...response,
          facilities: this.fleetTypeFormService.mapAmenityIdsToTitles(response.facilities as string[]),
          seatLayout: this.fleetTypeFormService.getSeatLayoutNameById(response.seatLayout)
        };
        this.fleetTypesData = [...this.fleetTypesData, newFleetType];
      },
      (error) => {
        console.error('Error adding fleet type:', error);
      }
    );
  }
}