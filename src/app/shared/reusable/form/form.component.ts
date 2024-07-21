import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent<T> {
  @Input() form !: FormGroup
  @Input() fields: FormField[] = []
  @Input() submitButtonText: string = 'Submit'
  @Output() formSubmit = new EventEmitter<T>()
  @Input() disabled: boolean = false;

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value as T);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getAllErrorMessages(field: FormField): string {
    const control = this.form.get(field.name);
    if (control?.errors) {
      return field.errors
        .filter(error => control.hasError(error.type))
        .map(error => error.message)
        .join('\n');
    }
    return '';
  }

  shouldShowError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  showTooltipIfInvalid(fieldName: string, tooltip: MatTooltip) {
    const control = this.form.get(fieldName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      tooltip.show();
    } else {
      tooltip.hide();
    }
  }
}