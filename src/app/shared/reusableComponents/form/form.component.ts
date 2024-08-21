import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SeatPreviewComponent } from '../../../pages/busOwner/seat-preview/seat-preview.component';
import { fadeInOut, slideInOut } from '../../animations/form.animations';
import { Feature, MapBoxService } from '../../services/map-box.service';
import { FormField, ModalFormField } from '../../../core/models/user/form-fields.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SeatPreviewComponent, MatSlideToggleModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatTooltipModule, MatIconModule, MatSelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  animations: [fadeInOut, slideInOut]
})
export class FormComponent<T> implements OnInit {
  @Input() form !: FormGroup
  @Input() fields: FormField[] = []
  @Input() submitButtonText: string = 'Submit'
  @Output() formSubmit = new EventEmitter<T>()
  @Input() disabled: boolean = false;
  @Input() hideSubmitButton: boolean = false;
  selectedSeats: string[] = [];
  locations: string[] = [];

  @Output() valueChanges = new EventEmitter<any>();
  private openMultiselects: { [key: string]: boolean } = {};


  constructor(private fb: FormBuilder, private mapboxService: MapBoxService) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      console.log('Form value changed in FormComponent:', value);
      this.valueChanges.emit(value);
    });
    this.form.get('location')?.statusChanges.subscribe(status => {
      console.log('Location status:', status);
      console.log('Location errors:', this.form.get('location')?.errors);
    });
  }

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

  shouldShowError(fieldName: string): boolean {
    if (fieldName === 'additionalStops') return false;
    const control = this.form.get(fieldName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }

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
    const newControl = this.fb.control('', Validators.required);
    this.additionalStops.push(newControl);
  }

  removeAdditionalStop(index: number) {
    this.additionalStops.removeAt(index);
  }

  get additionalStopsTime() {
    return this.form.get('additionalStopsTime') as FormArray;
  }

  addAdditionalStopTime() {
    this.additionalStopsTime.push(this.fb.control('', Validators.required));
  }

  removeAdditionalStopTime(index: number) {
    this.additionalStopsTime.removeAt(index);
  }

  search(event: Event, field: FormField) {
    if (field.type === 'autocomplete') {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      if (searchTerm && searchTerm.length > 0) {
        this.mapboxService.search_word(searchTerm).subscribe((features: Feature[]) => {
          this.locations = features.map(feat => this.formatPlaceName(feat.place_name));
        });
      } else {
        this.locations = [];
      }
    }
  }

  onSelect(location: string, field: FormField) {
    this.form.get(field.name)?.setValue(location);
    this.locations = [];
  }

  private formatPlaceName(placeName: string): string {
    const parts = placeName.split(', ');
    return parts.slice(0, 2).join(', ');
  }

  getMultiselectDisplayValue(fieldName: string): string {
    const selectedValues = this.form.get(fieldName)?.value || [];
    const field = this.fields.find(f => f.name === fieldName);
    if (!field) return '';
    return selectedValues.map((value: string) =>
      field.options?.find(option => option.value === value)?.label
    ).join(', ');
  }

  openMultiselectDropdown(fieldName: string) {
    this.openMultiselects[fieldName] = !this.openMultiselects[fieldName];
  }

  isMultiselectOpen(fieldName: string): boolean {
    return this.openMultiselects[fieldName] || false;
  }

  isOptionSelected(fieldName: string, optionValue: string): boolean {
    const selectedValues = this.form.get(fieldName)?.value || [];
    return selectedValues.includes(optionValue);
  }

  toggleMultiselectOption(fieldName: string, optionValue: string) {
    const control = this.form.get(fieldName);
    if (!control) return;

    const currentValues = control.value || [];
    const updatedValues = currentValues.includes(optionValue)
      ? currentValues.filter((value: string) => value !== optionValue)
      : [...currentValues, optionValue];

    control.setValue(updatedValues);
  }
}