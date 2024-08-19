import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ModalFormField } from '../../../models/user/form-fields.interface';
import { ModalComponent } from '../../../../shared/reusableComponents/modal/modal.component';

@Injectable({
    providedIn: 'root'
})
export class FleetTypeModalService {
    constructor(private dialog: MatDialog) { }

    openModal(title: string, fields: ModalFormField[], form: FormGroup, submitButtonText: string): Observable<any> {
        const dialogRef = this.dialog.open(ModalComponent, {
            width: '500px',
            data: {
                title,
                fields,
                form,
                submitButtonText
            }
        });

        return dialogRef.afterClosed();
    }
}