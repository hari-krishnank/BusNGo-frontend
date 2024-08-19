import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalFormField } from '../../../models/user/form-fields.interface';
import { AmenitiesService } from '../amenities/amenities.service';
import { SeatLayoutService } from '../seat-layout/seat-layout.service';
import { forkJoin, Observable } from 'rxjs';
import { IAmenity, ISeatLayout } from '../../../models/busOwner/fleet-type.interface';

@Injectable({
    providedIn: 'root'
})
export class FleetTypeFormService {
    private amenities: IAmenity[] = [];
    private seatLayouts: ISeatLayout[] = [];

    constructor(private formBuilder: FormBuilder, private amenitiesService: AmenitiesService, private seatLayoutService: SeatLayoutService) { }

    loadFormOptions(): Observable<{ amenities: IAmenity[], seatLayouts: ISeatLayout[] }> {
        return forkJoin({
            amenities: this.amenitiesService.getAllAmenities(),
            seatLayouts: this.seatLayoutService.getAllSeatLayouts()
        });
    }

    createFleetTypeForm(modalFields: ModalFormField[]): FormGroup {
        const form: { [key: string]: any } = {};

        modalFields.forEach(field => {
            if (field.type === 'toggle') {
                form[field.name] = [false];
            } else if (field.type === 'multiselect') {
                form[field.name] = [[], Validators.required];
            } else {
                form[field.name] = ['', Validators.required];
            }
        });
        return this.formBuilder.group(form);
    }

    updateModalFields(modalFields: ModalFormField[]): ModalFormField[] {
        return modalFields.map(field => {
            if (field.name === 'seatLayout') {
                field.type = 'select';
                field.options = this.seatLayouts.map(layout => ({ value: layout._id, label: layout.layoutName }));
            } else if (field.name === 'facilities') {
                field.type = 'multiselect';
                field.options = this.amenities.map(amenity => ({ value: amenity._id, label: amenity.title }));
            }
            return field;
        });
    }

    setAmenities(amenities: IAmenity[]): void {
        this.amenities = amenities;
    }

    setSeatLayouts(seatLayouts: ISeatLayout[]): void {
        this.seatLayouts = seatLayouts;
    }

    getSeatLayoutNameById(layoutId: string): string {
        const layout = this.seatLayouts.find(layout => layout._id === layoutId);
        return layout ? layout.layoutName : 'Unknown Layout';
    }

    mapAmenityIdsToTitles(amenityIds: string[]): string {
        return amenityIds.map(id => {
            const amenity = this.amenities.find(a => a._id === id);
            return amenity ? amenity.title : id;
        }).join(', ');
    }
}