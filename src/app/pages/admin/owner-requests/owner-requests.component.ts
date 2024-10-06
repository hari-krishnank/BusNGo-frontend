import { Component } from '@angular/core';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { ownerRequestsColumns } from '../../../shared/data/admin/owner-requests.columns';
import { OwnerRequestsService } from '../../../core/services/admin/owner-requests.service';
import { OwnerDetailsService } from '../../../core/services/admin/owner-details.service';

@Component({
  selector: 'app-owner-requests',
  standalone: true,
  imports: [CommonModule, AdminSideNavComponent, DataTableComponent],
  templateUrl: './owner-requests.component.html',
  styleUrl: './owner-requests.component.css'
})
export class OwnerRequestsComponent {
  isSidebarCollapsed: boolean = false;
  requestsData: any[] = [];
  ownerRequestsColumns = ownerRequestsColumns;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private ownerRequestsService: OwnerRequestsService, private ownerModalService: OwnerDetailsService) { }

  ngOnInit() {
    this.loadOwnerRequests();
  }

  loadOwnerRequests() {
    this.ownerRequestsService.getOwnerRegistrationRequests(this.currentPage, this.itemsPerPage)
      .subscribe(
        (response: any) => {
          this.requestsData = response.owners.map((owner: { lastName: any; firstName: any; }, index: number) => ({
            ...owner,
            fullName: owner.lastName ? `${owner.firstName} ${owner.lastName}` : owner.firstName,
            siNumber: (this.currentPage - 1) * this.itemsPerPage + index + 1
          }));
          this.totalItems = response.total;
        },
        (error) => {
          console.error('Error fetching owner requests:', error);
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
    this.loadOwnerRequests();
  }

  onApproveReject(event: { action: 'approve' | 'reject', item: any }) {
    if (event.action === 'approve') {
      this.approveOwner(event.item);
    } else {
      this.rejectOwner(event.item);
    }
  }

  approveOwner(owner: any) {
    this.ownerRequestsService.approveOwnerRegistration(owner.email)
      .subscribe(
        (response) => {
          this.loadOwnerRequests();
        },
        (error) => {
          console.error('Error approving owner:', error);
        }
      );
  }

  rejectOwner(owner: any) {
    this.ownerRequestsService.rejectOwnerRegistration(owner.email)
      .subscribe(
        (response) => {
          this.loadOwnerRequests(); 
        },
        (error) => {
          console.error('Error rejecting owner:', error);
        }
      );
  }
}