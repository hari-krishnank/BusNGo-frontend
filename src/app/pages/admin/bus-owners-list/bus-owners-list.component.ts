import { Component, OnInit } from '@angular/core';
import { AdminSideNavComponent } from '../admin-side-nav/admin-side-nav.component';
import { AdminLoginService } from '../../../core/services/admin/admin-login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ownersColumns } from '../../../shared/data/admin/owners.columns';
import { DataTableComponent } from '../../../shared/reusableComponents/data-table/data-table.component';

@Component({
  selector: 'app-bus-owners-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSideNavComponent, DataTableComponent],
  templateUrl: './bus-owners-list.component.html',
  styleUrl: './bus-owners-list.component.css'
})
export class BusOwnersListComponent implements OnInit {
  verifiedOwners: any[] = [];
  ownersColumns = ownersColumns;
  filteredOwners: any[] = [];
  searchTerm: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  isSidebarCollapsed: boolean = false;

  constructor(private adminService: AdminLoginService) { }

  ngOnInit() {
    this.loadVerifiedOwners();
  }

  loadVerifiedOwners() {
    this.adminService.getVerifiedOwners().subscribe(
      (owners) => {
        this.verifiedOwners = owners.map(owner => ({
          ...owner,
          fullName: owner.lastName ? `${owner.firstName} ${owner.lastName}` : owner.firstName
        }))
        this.totalItems = this.verifiedOwners.length;
        this.updateFilteredOwners();
      },
      (error) => {
        console.error('Error fetching verified owners:', error);
      }
    );
  }

  onSearch() {
    this.currentPage = 1;
    this.updateFilteredOwners();
  }

  updateFilteredOwners() {
    const filtered = this.verifiedOwners.filter(owner =>
      owner.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      owner.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      owner.mobile.includes(this.searchTerm) ||
      owner.agencyName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      owner.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      owner.registeredAddress.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      owner.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      owner.state.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      owner.country.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalItems = filtered.length;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.filteredOwners = filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateFilteredOwners();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getMaxItemsOnPage(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  onSidebarStateChange(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }
}