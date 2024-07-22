import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';

@Component({
  selector: 'app-fleettype',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './fleettype.component.html',
  styleUrl: './fleettype.component.css'
})
export class FleettypeComponent {
  fleetTypesData = [
    { name: 'AC', layout: '1 x 2', deck: '1', seats: '40', facilities: 'Water bottle', status: 'Active' },
    { name: 'Coach', layout: '1 x 2', deck: '1', seats: '40', facilities: 'Water bottle', status: 'Active' },
  ];

  fleetTypesColumns = [
    { key: 'name', label: 'NAME' },
    { key: 'layout', label: 'SEAT LAYOUT' },
    { key: 'deck', label: 'NO DECK' },
    { key: 'seats', label: 'TOTAL SEATS' },
    { key: 'facilities', label: 'FACILITIES' },
    { key: 'status', label: 'STATUS' },
  ];
}
