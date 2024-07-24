import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormComponent, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogActions, MatDialogContent, MatIconModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  form !: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, fields: FormField[] },
    private fb: FormBuilder
  ) {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    const group: any = {};
    this.data.fields.forEach(field => {
      group[field.name] = [''];
    });
    return this.fb.group(group);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(formData: any): void {
    this.dialogRef.close(formData);
  }
}