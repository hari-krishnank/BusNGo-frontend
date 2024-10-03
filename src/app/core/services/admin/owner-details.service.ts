import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ModalComponent } from "../../../shared/reusableComponents/modal/modal.component";

@Injectable({
    providedIn: 'root'
})
export class OwnerDetailsService {
    constructor(private dialog: MatDialog) { }

    openOwnerModal(owner: any | undefined): Observable<any | undefined> {
        const title = 'Owner Details';

        return this.dialog.open(ModalComponent, {
            width: '700px',
            data: {
                title,
                viewDetailsData: owner
            }
        }).afterClosed();
    }
}