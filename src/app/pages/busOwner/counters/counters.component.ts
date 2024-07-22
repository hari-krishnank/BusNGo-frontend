import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, CommonModule],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.css'
})
export class CountersComponent {
  countersData = [
    { name: 'Calicut', mobileNumber: '7994673892', city: 'Calicut', location: 'Calicut', status: 'Active' },
    { name: 'Kannur', mobileNumber: '9562648963', city: 'Kannur', location: 'Kannur', status: 'Active' },
  ];

  countersColumns = [
    { key: 'name', label: 'Name' },
    { key: 'mobileNumber', label: 'MOBILE NUMBER' },
    { key: 'city', label: 'CITY' },
    { key: 'location', label: 'LOCATION' },
    { key: 'status', label: 'STATUS' },
  ];
}
