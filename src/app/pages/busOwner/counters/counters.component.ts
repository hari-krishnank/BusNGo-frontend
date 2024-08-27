import { Component, OnInit } from '@angular/core';
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
import { OwnernavComponent } from '../../../shared/widgets/ownernav/ownernav.component';
import { CountersResponse, ICounter } from '../../../core/models/busOwner/counter.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [OwnernavComponent, DataTableComponent, CommonModule, ModalComponent, ReactiveFormsModule, BusOwnerfooterComponent, ToastModule],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.css'
})
export class CountersComponent implements OnInit {
  allCountersData: ICounter[] = [];
  countersData: ICounter[] = [];
  countersColumns = countersColumns;
  modalFields = counterModalFields;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private countersService: CounterService, private counterModalService: CounterModalService, private counterSearchService: CounterSearchService, private toastr: MessageService) { }

  ngOnInit(): void {
    this.loadCounters();
  }

  loadCounters(): void {
    this.countersService.getCounters(this.currentPage, this.itemsPerPage).subscribe(
      (data: CountersResponse) => {
        this.countersData = data.counters;
        console.log(this.countersData);
        this.totalItems = data.total;
      },
      error => console.error('Error loading counters:', error)
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadCounters();
  }

  openModal(counter?: ICounter): void {
    this.counterModalService.openCounterModal(counter, this.modalFields)
      .subscribe(result => {
        if (result) {
          counter ? this.updateCounter(counter._id, result) : this.saveCounter(result);
        }
      });
  }

  updateCounter(id: string, formData: Partial<ICounter>): void {
    this.countersService.updateCounter(id, formData).subscribe(
      () => {
        this.loadCounters(),
          this.toastr.add({ key: 'tst', severity: 'success', summary: 'Counter updated successfully', life: 3000, closable: true, icon: 'pi pi-check-circle' })
      },
      error => {
        console.error('Error updating counter:', error)
        this.handleErrorMessage(error)
      }
    );
  }

  saveCounter(formData: Omit<ICounter, '_id'>): void {
    this.countersService.addCounter(formData).subscribe(
      () => {
        this.loadCounters(),
          this.toastr.add({ key: 'tst', severity: 'success', summary: 'Counter added successfully', life: 3000, closable: true, icon: 'pi pi-check-circle' })
      },
      error => {
        console.error('Error adding counter:', error)
        this.handleErrorMessage(error);
      }
    );
  }

  deleteCounter(counter: ICounter): void {
    this.counterModalService.confirmDelete(counter.name).subscribe(result => {
      if (result) {
        this.countersService.deleteCounter(counter._id).subscribe(
          () => {
            this.loadCounters(),
              this.toastr.add({ key: 'tst', severity: 'success', summary: 'Counter deleted successfully', life: 3000, closable: true, icon: 'pi pi-check-circle' })
          },
          error => {
            console.error('Error deleting Bus Station:', error)
            this.handleErrorMessage(error)
          }
        );
      }
    });
  }

  searchCounters(searchTerm: string): void {
    this.countersData = this.counterSearchService.searchCounters(this.allCountersData, searchTerm);
  }
  
  private handleErrorMessage(error: any): void {
    if (typeof error === 'string') {
      if (error.includes('counter with the name')) {
        this.toastr.add({ key: 'tst', severity: 'error', summary: error, life: 2000, closable: true, icon: 'pi pi-times-circle' });
      } else if (error.includes('counter in the city')) {
        this.toastr.add({ key: 'tst', severity: 'error', summary: error, life: 2000, closable: true, icon: 'pi pi-times-circle' });
      } else if (error.includes('counter at the location')) {
        this.toastr.add({ key: 'tst', severity: 'error', summary: error, life: 2000, closable: true, icon: 'pi pi-times-circle' });
      } else {
        this.toastr.add({ key: 'tst', severity: 'error', summary: error, life: 2000, closable: true, icon: 'pi pi-times-circle' });
      }
    } else {
      this.toastr.add({ key: 'tst', severity: 'error', summary: 'An error occurred while processing your request', life: 3000, closable: true, icon: 'pi pi-times-circle' });
    }
  }
}