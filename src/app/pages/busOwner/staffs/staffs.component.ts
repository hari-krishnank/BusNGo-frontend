import { Component } from '@angular/core';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { staffModalFields } from '../../../shared/configs/busOwner/staffsForm-config';
import { ICreateStaff, IStaffs } from '../../../core/models/busOwner/staff.interface';
import { StaffsModalService } from '../../../core/services/busOwner/staffs/staffs-modal.service';
import { staffsColumns } from '../../../shared/data/busOwner/staffs-columns';
import { StaffService } from '../../../core/services/busOwner/staffs/staff.service';
import { BusService } from '../../../core/services/busOwner/add-bus/add-bus.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-staffs',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.css'
})
export class StaffsComponent {
  modalFields = staffModalFields;
  staffColumns = staffsColumns;
  staffs: IStaffs[] = [];
  buses: any[] = [];

  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  constructor(private staffModalService: StaffsModalService, private staffApiService: StaffService, private busService: BusService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadBuses();
    this.loadStaffs();
  }

  loadStaffs() {
    this.staffApiService.getStaffs().subscribe(
      (staffs) => {
        this.staffs = staffs.map(staff => ({
          ...staff,
          bus: typeof staff.bus === 'object' ? staff.bus.name : staff.bus
        }));
        console.log(this.staffs);
      },
      (error) => {
        console.error('Error loading staffs:', error);
      }
    );
  }

  loadBuses() {
    this.busService.getAllBuses().subscribe(
      (buses) => {
        this.buses = buses;
        this.updateBusField();
      },
      (error) => {
        console.error('Error loading buses:', error);
      }
    );
  }

  updateBusField() {
    const busField = this.modalFields.find(field => field.name === 'bus');
    if (busField) {
      busField.options = this.buses.map(bus => ({ value: bus._id, label: bus.name }));
    }
  }

  openModal(staffs?: IStaffs): void {
    this.staffModalService.openStaffModal(staffs, this.modalFields)
      .subscribe(result => {
        if (result) {
          this.createStaff(result);
        }
      });
  }

  private createStaff(staffData: ICreateStaff): void {
    this.staffApiService.createStaff(staffData)
      .subscribe(
        (createdStaff) => {
          console.log('Staff created successfully:', createdStaff);
          this.loadStaffs();
          this.showSnackbar('Staff created successfully', 3000);
        },
        (error) => {
          console.error('Error creating staff:', error);
          this.showSnackbar(error);
        }
      );
  }

  private showSnackbar(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Close', { ...this.snackBarConfig, duration });
  }
}