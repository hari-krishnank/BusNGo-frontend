import { Component, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { scheduleColumns } from '../../../shared/data/busOwner/schedule-column';
import { scheduleModalFields } from '../../../shared/configs/busOwner/scheduleForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../../../core/services/busOwner/schedule/schedule.service';
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  scheduleData: any[] = [];
  scheduleColumns = scheduleColumns;
  modalFields: ModalFormField[] = scheduleModalFields;
  scheduleForm!: FormGroup;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private dialog: MatDialog, private fb: FormBuilder, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.createScheduleForm();
    this.loadSchedules();
  }

  createScheduleForm() {
    this.scheduleForm = this.fb.group({
      startFrom: ['', Validators.required],
      end: ['', Validators.required],
      duration: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  loadSchedules() {
    this.scheduleService.getSchedules(this.currentPage, this.itemsPerPage).subscribe(
      (response) => {
        console.log('Response from server:', response);
        this.scheduleData = response.schedules; 
        this.totalItems = response.total;
      },
      (error) => {
        console.error('Error loading schedules:', error);
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadSchedules();
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Schedule',
        fields: this.modalFields,
        form: this.scheduleForm,
        submitButtonText: 'Add Schedule'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveSchedule(result);
      }
    });
  }

  saveSchedule(formData: any) {
    this.scheduleService.createSchedule(formData).subscribe(
      (newSchedule) => {
        console.log('New schedule:', newSchedule);
        this.scheduleData = [...this.scheduleData, newSchedule];
        this.resetForm();
      },
      (error) => {
        console.error('Error creating schedule:', error);
      }
    );
  }

  resetForm() {
    this.scheduleForm.reset()
  }
}