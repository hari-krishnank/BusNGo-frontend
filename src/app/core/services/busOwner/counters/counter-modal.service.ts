import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CounterFormService } from './counter-form.service';
import { ModalComponent } from '../../../../shared/reusableComponents/modal/modal.component';
import { ConfirmDialogComponent } from '../../../../shared/reusableComponents/confirm-dialog/confirm-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class CounterModalService {
    constructor(
        private dialog: MatDialog,
        private counterFormService: CounterFormService
    ) { }

    openCounterModal(counter: any, modalFields: any[]): Observable<any> {
        const title = counter ? 'Edit Bus Station' : 'Add Bus Station';
        const submitButtonText = counter ? 'Update Bus Station' : 'Add Bus Station';
        const form = this.counterFormService.createCounterForm(counter);

        return this.dialog.open(ModalComponent, {
            width: '500px',
            data: { title, fields: modalFields, submitButtonText, form }
        }).afterClosed();
    }

    confirmDelete(counterName: string): Observable<boolean> {
        return this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete the Bus Station "${counterName}"?`
            }
        }).afterClosed();
    }
}