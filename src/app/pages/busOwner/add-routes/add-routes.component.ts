import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { addRouteModalFields } from '../../../shared/configs/busOwner/addRoutesForm-config';
import { routesData } from '../../../shared/data/busOwner/addroutes/routes-data';
import { routesColumns } from '../../../shared/data/busOwner/addroutes/routes-columns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-routes',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './add-routes.component.html',
  styleUrl: './add-routes.component.css'
})
export class AddRoutesComponent implements OnInit {
  routesData = routesData
  routesColumns = routesColumns
  modalFields: ModalFormField[] = addRouteModalFields
  routeForm!: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRouteForm();
  }

  createRouteForm() {
    this.routeForm = this.fb.group({
      name: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      distance: ['', [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      fare: ['', [Validators.required, Validators.min(0)]]
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

  saveRoute(formData: any) {
    console.log('New route:', formData);
    this.routesData.push({ ...formData, status: 'Active' });
  }
}