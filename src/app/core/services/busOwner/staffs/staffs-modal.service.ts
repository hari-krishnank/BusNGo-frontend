import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { StaffFormService } from "./staff-form.service";
import { IStaffs } from "../../../models/busOwner/staff.interface";
import { ModalFormField } from "../../../models/user/form-fields.interface";
import { Observable } from "rxjs";
import { ModalComponent } from "../../../../shared/reusableComponents/modal/modal.component";

@Injectable({
    providedIn: 'root'
})
export class StaffsModalService {
    constructor(private dialog: MatDialog, private staffFormService: StaffFormService) { }
    openStaffModal(staffs: IStaffs | undefined, modalFields: ModalFormField[]): Observable<IStaffs | undefined> {
        const title = 'Create Staff for the Bus';
        const submitButtonText = 'Create Staff';
        const form = this.staffFormService.createStaffForm(staffs);

        return this.dialog.open(ModalComponent, {
            width: '500px',
            data: { title, fields: modalFields, submitButtonText, form }
        }).afterClosed();
    }
}