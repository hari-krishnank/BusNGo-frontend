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
      },
      (error) => {
        console.error('Error loading counters:', error);
      }
    );
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Add Counter',
        fields: this.modalFields,
        submitButtonText: 'Add Counter',
        form: this.createCounterForm()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCounter(result);
      }
    });
  }

  createCounterForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      city: [''],
      location: [''],
      mobileNumber: ['']
    });
  }

  saveCounter(formData: any) {
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
}