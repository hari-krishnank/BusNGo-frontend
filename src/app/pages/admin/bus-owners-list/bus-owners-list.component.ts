import { Component, OnInit } from '@angular/core';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ownersColumns } from '../../../shared/data/admin/owners.columns';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';
import { OwnersResponse } from '../../../core/models/admin/users.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OwnerDetailsService } from '../../../core/services/admin/owner-details.service';

@Component({
  selector: 'app-bus-owners-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSideNavComponent, DataTableComponent],
  templateUrl: './bus-owners-list.component.html',
  styleUrl: './bus-owners-list.component.css'
})
export class BusOwnersListComponent implements OnInit {
  isSidebarCollapsed: boolean = false;
  verifiedOwners: any[] = [];
  ownersColumns = ownersColumns;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private adminService: AdminLoginService, private snackBar: MatSnackBar, private ownerModalService: OwnerDetailsService) { }

  ngOnInit() {
    this.loadVerifiedOwners();
  }

  onSidebarStateChange(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  loadVerifiedOwners() {
    this.adminService.getVerifiedOwners(this.currentPage, this.itemsPerPage).subscribe(
      (response: OwnersResponse) => {
        this.verifiedOwners = response.owners.map((owner, index) => ({
          ...owner,
          fullName: owner.lastName ? `${owner.firstName} ${owner.lastName}` : owner.firstName,
          siNumber: (this.currentPage - 1) * this.itemsPerPage + index + 1
        }));
        this.totalItems = response.total;
      },
      (error) => {
        console.error('Error fetching verified owners:', error);
        this.showMessage('Failed to load users. Please try again.');
      }
    );
  }

  onBlockUnblock(owner: any) {
    this.adminService.toggleOwnerBlock(owner._id, !owner.is_blocked).subscribe(
      (response) => {
        owner.is_blocked = !owner.is_blocked;
        this.showMessage(`${owner.fullName} has been successfully ${owner.is_blocked ? 'blocked' : 'unblocked'}.`);
      },
      (error) => {
        console.error('Error toggling owner block status', error);
        this.showMessage('Failed to update user status. Please try again.');
      }
    );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.loadVerifiedOwners();
  }

  openModal(owner?: any): void {
    this.ownerModalService.openOwnerModal(owner)
      .subscribe(result => {
        console.log(result);
      });
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}