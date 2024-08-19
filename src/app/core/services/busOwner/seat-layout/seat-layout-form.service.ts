import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../../shared/validators/validators';
import { ISeatLayout } from '../../../models/busOwner/seatLayout.interface';

@Injectable({
    providedIn: 'root'
})
export class SeatLayoutFormService {
    constructor(private formBuilder: FormBuilder) { }

    createLayoutsForm(layout?: Partial<ISeatLayout>): FormGroup {
        return this.formBuilder.group({
            layoutName: [layout?.layoutName || '', Validators.required],
            rows: [layout?.rows || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            columns: [layout?.columns || '', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            status: [layout ? layout.status : '', [Validators.required, noWhitespaceValidator()]],
            upperDeck: [layout?.upperDeck || false]
        });
    }

    calculateTotalSeats(layout: ISeatLayout): number {
        return layout.selectedSeats ? layout.selectedSeats.length : 0;
    }
}