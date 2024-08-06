import { Component, OnInit } from '@angular/core';
import { OwnersecondnavComponent } from '../../../shared/widgets/ownersecondnav/ownersecondnav.component';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/reusableComponents/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BusOwnerfooterComponent } from '../../../shared/widgets/bus-ownerfooter/bus-ownerfooter.component';
import { CounterService } from '../../../core/services/busOwner/counters/counter.service';
import { CounterModalService } from '../../../core/services/busOwner/counters/counter-modal.service';
import { CounterSearchService } from '../../../core/services/busOwner/counters/counter-search.service';
import { countersColumns } from '../../../shared/data/busOwner/counters-columns';
import { counterModalFields } from '../../../shared/configs/busOwner/counterForm-config';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [OwnersecondnavComponent, DataTableComponent, CommonModule, ModalComponent, ReactiveFormsModule, BusOwnerfooterComponent],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.css'
})
export class CountersComponent implements OnInit {
  allCountersData: any[] = [];
  countersData: any[] = [];
  countersColumns = countersColumns;
  modalFields = counterModalFields;

  constructor(
    private countersService: CounterService,
    private counterModalService: CounterModalService,
    private counterSearchService: CounterSearchService
  ) { }

  ngOnInit(): void {
    this.loadCounters();
  }

  loadCounters(): void {
    this.countersService.getCounters().subscribe(
      data => {
        this.allCountersData = data;
        this.countersData = data;
      },
      error => console.error('Error loading counters:', error)
    );
  }

  openModal(counter?: any): void {
    this.counterModalService.openCounterModal(counter, this.modalFields)
      .subscribe(result => {
        if (result) {
          counter ? this.updateCounter(counter._id, result) : this.saveCounter(result);
        }
      });
  }

  updateCounter(id: string, formData: any): void {
    this.countersService.updateCounter(id, formData).subscribe(
      () => this.loadCounters(),
      error => console.error('Error updating counter:', error)
    );
  }

  saveCounter(formData: any): void {
    this.countersService.addCounter(formData).subscribe(
      () => this.loadCounters(),
      error => console.error('Error adding counter:', error)
    );
  }

  deleteCounter(counter: any): void {
    this.counterModalService.confirmDelete(counter.name).subscribe(result => {
      if (result) {
        this.countersService.deleteCounter(counter._id).subscribe(
          () => this.loadCounters(),
          error => console.error('Error deleting Bus Station:', error)
        );
      }
    });
  }

  searchCounters(searchTerm: string): void {
    this.countersData = this.counterSearchService.searchCounters(this.allCountersData, searchTerm);
  }
}