import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { counterModalFields } from '../../../shared/configs/busOwner/counterForm-config';
import { countersColumns } from '../../../shared/data/busOwner/counters/counters-columns';
import { CounterService } from '../../../core/services/busOwner/counter.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../shared/reusableComponents/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, CommonModule, ModalComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.css'
})
export class CountersComponent implements OnInit {
  countersData: any[] = []
  countersColumns = countersColumns;
  modalFields: ModalFormField[] = counterModalFields;

  constructor(private dialog: MatDialog, private countersService: CounterService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadCounters()
  }

  loadCounters() {
    this.countersService.getCounters().subscribe(
      (data) => {
        this.countersData = data;
        console.log('counterData:', this.countersData);

      },
      (error) => {
        console.error('Error loading counters:', error);
      }
    );
  }

  openModal(counter?: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: counter ? 'Edit Counter' : 'Add Counter',
        fields: this.modalFields,
        submitButtonText: counter ? 'Update Counter' : 'Add Counter',
        form: this.createCounterForm(counter)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
      if (result) {
        if (counter) {
          this.updateCounter(counter._id, result);
        } else {
          this.saveCounter(result);
        }
      }
    });
  }

  createCounterForm(counter?: any): FormGroup {
    return this.formBuilder.group({
      name: [counter ? counter.name : '', Validators.required],
      city: [counter ? counter.city : ''],
      location: [counter ? counter.location : ''],
      mobileNumber: [counter ? counter.mobileNumber : '']
    });
  }

  updateCounter(id: string, formData: any) {
    console.log('Updating counter:', formData);
    this.countersService.updateCounter(id, formData).subscribe(
      (response) => {
        console.log('Counter updated:', response);
        this.loadCounters();
      },
      (error) => {
        console.error('Error updating counter:', error);
      }
    );
  }

  saveCounter(formData: any) {
    console.log('Saving counter:', formData);
    this.countersService.addCounter(formData).subscribe(
      (response) => {
        console.log('New counter added:', response);
        this.loadCounters();
      },
      (error) => {
        console.error('Error adding counter:', error);
      }
    );
  }


  deleteCounter(counter: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete the counter "${counter.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.countersService.deleteCounter(counter._id).subscribe(
          () => {
            console.log('Counter deleted successfully');
            this.loadCounters();
          },
          error => {
            console.error('Error deleting counter:', error);
          }
        );
      }
    });
  }
}