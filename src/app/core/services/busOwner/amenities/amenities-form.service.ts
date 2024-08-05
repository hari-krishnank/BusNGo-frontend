import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../../shared/validators/validators';
import { IAmenity } from '../../../models/busOwner/amenity.interface';

@Injectable({
    providedIn: 'root'
})
export class AmenitiesFormService {
    constructor(private formBuilder: FormBuilder) { }

    createAmenitiesForm(amenity?: IAmenity): FormGroup {
        return this.formBuilder.group({
            title: [amenity ? amenity.title : '', [Validators.required, noWhitespaceValidator()]],
            icon: [amenity ? amenity.icon : '', [Validators.required, noWhitespaceValidator()]],
            status: [amenity ? amenity.status : '', [Validators.required, noWhitespaceValidator()]]
        });
    }
}