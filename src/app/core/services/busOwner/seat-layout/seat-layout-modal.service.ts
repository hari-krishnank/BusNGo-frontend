import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SeatLayoutFormService } from './seat-layout-form.service';
import { ModalFormField } from '../../../models/user/form-fields.interface';
import { seatLayoutmodalFields } from '../../../../shared/configs/busOwner/seatLayoutsForm-config';
import { ModalComponent } from '../../../../shared/reusableComponents/modal/modal.component';
import { SeatPreviewModalComponent } from '../../../../pages/busOwner/seat-preview-modal/seat-preview-modal.component';
import { ConfirmDialogComponent } from '../../../../shared/reusableComponents/confirm-dialog/confirm-dialog.component';
import { ISeatLayout, SeatLayoutFormData } from '../../../models/busOwner/seatLayout.interface';

@Injectable({
    providedIn: 'root'
})
export class SeatLayoutModalService {
    modalFields: ModalFormField[] = seatLayoutmodalFields;

    constructor(private dialog: MatDialog, private seatLayoutFormService: SeatLayoutFormService) { }

    openAddModal(): Observable<SeatLayoutFormData | undefined> {
        return this.dialog.open(ModalComponent, {
            width: '600px',
            data: {
                title: 'Add Layouts',
                fields: this.modalFields,
                form: this.seatLayoutFormService.createLayoutsForm(),
                submitButtonText: 'Add Seat Layout'
            }
        }).afterClosed();
    }

    openEditModal(layout: ISeatLayout): Observable<SeatLayoutFormData | undefined> {
        return this.dialog.open(ModalComponent, {
            width: '600px',
            data: {
                title: 'Edit Layout',
                fields: this.modalFields,
                form: this.seatLayoutFormService.createLayoutsForm(layout),
                submitButtonText: 'Update Seat Layout',
                existingLayout: layout
            }
        }).afterClosed();
    }

    openPreviewModal(layout: ISeatLayout): void {
        this.dialog.open(SeatPreviewModalComponent, {
            width: '500px',
            data: layout
        });
    }

    openDeleteConfirmationModal(layoutName: string): Observable<boolean> {
        return this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Delete Seat Layout',
                message: `Are you sure you want to delete the seat layout "${layoutName}"?`
            }
        }).afterClosed();
    }
}