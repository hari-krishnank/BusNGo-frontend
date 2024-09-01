import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onLogin(): void {
    this.dialogRef.close('login');
  }
}
