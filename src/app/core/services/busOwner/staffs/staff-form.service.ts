import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../../shared/validators/validators';
import { IStaffs } from '../../../models/busOwner/staff.interface';

@Injectable({
    providedIn: 'root'
})
export class StaffFormService {
    constructor(private formBuilder: FormBuilder) { }

    createStaffForm(staffs?: Partial<IStaffs>): FormGroup {
        return this.formBuilder.group({
            username: [staffs ? staffs.username : '', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]],
            email: [staffs ? staffs.email : '', [Validators.required]],
            mobile: [staffs ? staffs.mobile : '', [Validators.required]],
            bus: [staffs ? staffs.bus : '', [Validators.required]]
        });
    }
}