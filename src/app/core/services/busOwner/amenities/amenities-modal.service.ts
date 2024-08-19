import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AmenitiesFormService } from './amenities-form.service';
import { ModalComponent } from '../../../../shared/reusableComponents/modal/modal.component';
import { ConfirmDialogComponent } from '../../../../shared/reusableComponents/confirm-dialog/confirm-dialog.component';
import { ModalFormField } from '../../../models/user/form-fields.interface';
import { IAmenity } from '../../../models/busOwner/amenity.interface';

@Injectable({
    providedIn: 'root'
})
export class AmenitiesModalService {
    constructor(private dialog: MatDialog, private amenitiesFormService: AmenitiesFormService) { }

    openModal(amenity: IAmenity | undefined, modalFields: ModalFormField[]): Observable<IAmenity> {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '500px',
            data: {
                title: amenity ? 'Edit Amenity' : 'Add Amenity',
                fields: modalFields,
                submitButtonText: amenity ? 'Update Amenity' : 'Add Amenity',
                form: this.amenitiesFormService.createAmenitiesForm(amenity)
            }
        });
        return dialogRef.afterClosed();
    }

    openDeleteConfirmDialog(amenity: IAmenity): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete the amenity "${amenity.title}"?`
            }
        });
        return dialogRef.afterClosed();
    }
}