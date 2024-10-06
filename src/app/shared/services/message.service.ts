import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    constructor(private snackBar: MatSnackBar) { }

    private showSnackbar(message: string): void {
        const config: MatSnackBarConfig = {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
        };
        this.snackBar.open(message, 'Close', config);
    }

    showSuccessMessage(message: string): void {
        this.showSnackbar(message);
    }

    showErrorMessage(message: string): void {
        this.showSnackbar(message);
    }
}