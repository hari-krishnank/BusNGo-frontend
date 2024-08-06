import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { scheduleColumns } from '../../../shared/data/busOwner/schedule-column';
import { scheduleModalFields } from '../../../shared/configs/busOwner/scheduleForm-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../../../core/services/busOwner/schedule/schedule.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  scheduleData: any[] = [];
  scheduleColumns = scheduleColumns;
  modalFields: ModalFormField[] = scheduleModalFields;
  scheduleForm!: FormGroup;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private scheduleService: ScheduleService
  ) {}

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
    this.scheduleService.getSchedules().subscribe(
      (schedules) => {
        this.scheduleData = schedules;
      },
      (error) => {
        console.error('Error loading schedules:', error);
      }
    );
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
      },
      (error) => {
        console.error('Error creating schedule:', error);
      }
    );
  }
}