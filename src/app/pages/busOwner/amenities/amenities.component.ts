import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { ModalFormField } from '../../../core/models/user/form-fields.interface';
import { amenitiesModalFields } from '../../../shared/configs/busOwner/amenitiesForm-config';
import { amenitiesColumns } from '../../../shared/data/busOwner/amenities/amenities-columns';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AmenitiesService } from '../../../core/services/busOwner/amenities.service';
import { ConfirmDialogComponent } from '../../../shared/reusableComponents/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, ReactiveFormsModule],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent {
  amenitiesData: any[] = [];
  amenitiesColumns = amenitiesColumns;
  modalFields: ModalFormField[] = amenitiesModalFields;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private amenitiesService: AmenitiesService) { }

  ngOnInit() {
    this.loadAmenities();
  }

  loadAmenities() {
    this.amenitiesService.getAmenities().subscribe(
      (data) => {
        this.amenitiesData = data.map((amenity, index) => ({
          ...amenity,
          slNo: index + 1
        }));
        console.log('amenities Data', this.amenitiesData);
      },
      (error) => {
        console.error('Error fetching amenities:', error);
      }
    );
  }

  openModal(amenity?: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: amenity ? 'Edit Amenity' : 'Add Amenity',
        fields: this.modalFields,
        submitButtonText: amenity ? 'Update Amenity' : 'Add Amenity',
        form: this.createAmenitiesForm(amenity)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (amenity) {
          this.updateAmenity(amenity._id, result);
        } else {
          this.saveAmenity(result);
        }
      }
    });
  }

  createAmenitiesForm(amenity?: any): FormGroup {
    return this.formBuilder.group({
      title: [amenity ? amenity.title : '', Validators.required],
      icon: [amenity ? amenity.icon : '', Validators.required]
    });
  }

  updateAmenity(id: string, formData: any) {
    this.amenitiesService.updateAmenity(id, formData).subscribe(
      (updatedAmenity) => {
        console.log('Amenity updated:', updatedAmenity);
        this.loadAmenities();
      },
      (error) => {
        console.error('Error updating amenity:', error);
      }
    );
  }

  saveAmenity(formData: any) {
    this.amenitiesService.createAmenity(formData).subscribe(
      (newAmenity) => {
        console.log('New amenity saved:', newAmenity);
        this.loadAmenities();
      },
      (error) => {
        console.error('Error saving amenity:', error);
      }
    );
  }

  deleteAmenity(amenity: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete the amenity "${amenity.title}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.amenitiesService.deleteAmenity(amenity._id).subscribe(
          () => {
            console.log('Amenity deleted');
            this.loadAmenities();
          },
          (error) => {
            console.error('Error deleting amenity:', error);
          }
        );
      }
    });
  }
}