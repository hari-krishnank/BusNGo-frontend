import { Component } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusable/data-table/data-table.component';

@Component({
  selector: 'app-buses',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent],
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.css'
})
export class BusesComponent {
  busesData = [
    { name: 'Emerald Travels', regNo: 'KL-15-A-1234', engineNo: 'D6CH-345678', chasisNo: 'YV3T2U528EA123456', ModelNo: 'Emerald-VIP-2024', FleetType: 'AC', status: 'Active' }
  ];

  busesColumns = [
    { key: 'name', label: 'NAME' },
    { key: 'regNo', label: 'REGISTER NO' },
    { key: 'engineNo', label: 'ENGINE NO' },
    { key: 'chasisNo', label: 'CHASIS NO' },
    { key: 'ModelNo', label: 'MODEL NO' },
    { key: 'FleetType', label: 'FLEET TYPE' },
    { key: 'status', label: 'STATUS' },
  ];
}
