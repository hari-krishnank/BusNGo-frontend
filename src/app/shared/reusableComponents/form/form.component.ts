import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField, ModalFormField } from '../../../core/models/user/form-fields.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SeatPreviewComponent } from '../../../pages/busOwner/seat-preview/seat-preview.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SeatPreviewComponent, MatSlideToggleModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule, MatIconModule, MatSelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent<T> {
  @Input() form !: FormGroup
  @Input() fields: FormField[] = []
  @Input() submitButtonText: string = 'Submit'
  @Output() formSubmit = new EventEmitter<T>()
  @Input() disabled: boolean = false;
  selectedSeats: string[] = [];

  constructor(private fb: FormBuilder) { }

  onSeatsSelected(seats: string[]) {
    this.selectedSeats = seats;
    this.form.patchValue({ selectedSeats: this.selectedSeats });
    console.log('Selected seats:', this.selectedSeats);
  }

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

  // shouldShowError(fieldName: string): boolean {
  //   const control = this.form.get(fieldName);
  //   return control ? (control.invalid && (control.dirty || control.touched)) : false;
  // }

  shouldShowError(fieldName: string): boolean {
    if (fieldName === 'additionalStops') return false;
    const control = this.form.get(fieldName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

  // showTooltipIfInvalid(fieldName: string, tooltip: MatTooltip) {
  //   const control = this.form.get(fieldName);
  //   if (control && control.invalid && (control.dirty || control.touched)) {
  //     tooltip.show();
  //   } else {
  //     tooltip.hide();
  //   }
  // }

  showTooltipIfInvalid(fieldName: string, tooltip: MatTooltip) {
    if (fieldName === 'additionalStops') return;
    const control = this.form.get(fieldName);
    if (control && control.invalid && (control.dirty || control.touched)) {
      tooltip.show();
    } else {
      tooltip.hide();
    }
  }

  isIconSelectField(field: FormField): boolean {
    return field.type === 'iconSelect';
  }

  isSelectField(field: ModalFormField): boolean {
    return field.type === 'select';
  }

  get additionalStops() {
    return this.form.get('additionalStops') as FormArray;
  }

  addAdditionalStop() {
    const newControl = this.fb.control('',Validators.required);
    this.additionalStops.push(newControl);
  }

  removeAdditionalStop(index: number) {
    this.additionalStops.removeAt(index);
  }

}