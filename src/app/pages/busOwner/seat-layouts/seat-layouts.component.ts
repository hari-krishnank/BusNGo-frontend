import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';

@Component({
  selector: 'app-seat-layouts',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './seat-layouts.component.html',
  styleUrl: './seat-layouts.component.css'
})
export class SeatLayoutsComponent {
  seatLayoutsData = [
    { slNo: 1, layout: '1 x 2' },
    { slNo: 2, layout: '2 x 3' },
  ];

  seatLayoutsColumns = [
    { key: 'slNo', label: 'SI NO' },
    { key: 'layout', label: 'LAYOUT' },
  ];
}
