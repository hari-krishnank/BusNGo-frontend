import { Component } from '@angular/core';
import { OwnerRequestsService } from '../../../core/services/admin/owner-requests.service';
import { OwnerDetailsService } from '../../../core/services/admin/owner-details.service';
import { ownerRequestsColumns } from '../../../shared/data/admin/owner-requests.columns';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { CommonModule } from '@angular/common';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejected-requests',
  standalone: true,
  imports: [CommonModule,DataTableComponent, AdminSideNavComponent],
  templateUrl: './rejected-requests.component.html',
  styleUrl: './rejected-requests.component.css'
})
export class RejectedRequestsComponent {
  isSidebarCollapsed: boolean = false;
  rejectedRequestsData: any[] = [];
  rejectedRequestColumns: any[];
  currentPage: number = 1;
  itemsPerPage: number = 5; 
  totalItems: number = 0;

  constructor(
    private ownerRequestsService: OwnerRequestsService,
    private ownerModalService: OwnerDetailsService,
    private router: Router
  ) {
    this.rejectedRequestColumns = ownerRequestsColumns.filter(col => col.key !== 'approveReject');
  }

  ngOnInit() {
    this.loadRejectedRequests();
  } 

  loadRejectedRequests() {
    this.ownerRequestsService.getRejectedOwnerRequests(this.currentPage, this.itemsPerPage).subscribe(
      (response: any) => {
        this.rejectedRequestsData = response.owners.map((owner: any, index: number) => ({
          ...owner,
          fullName: owner.lastName ? `${owner.firstName} ${owner.lastName}` : owner.firstName,
          siNumber: (this.currentPage - 1) * this.itemsPerPage + index + 1
        }));
        this.totalItems = response.total;
      },
      (error) => {
        console.error('Error fetching rejected owner requests:', error);
      }
    );
  }

  openModal(owner: any): void {
    this.ownerModalService.openOwnerModal(owner)
      .subscribe(result => {
        console.log(result);
      });
  }

  onSidebarStateChange(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadRejectedRequests();
  }

  navigateToRejectedRequests() {
    this.router.navigate(['/admin/owner-requests']);
  }
}
