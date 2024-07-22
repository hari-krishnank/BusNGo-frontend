import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent {
  amenitiesData = [
    { slNo: 1, title: 'Water Bottle', icon: '🍶' },
    { slNo: 2, title: 'Pillow', icon: '🛏️' },
  ];

  amenitiesColumns = [
    { key: 'slNo', label: 'SI NO' },
    { key: 'title', label: 'TITLE' },
    { key: 'icon', label: 'ICON' },
  ];
}
