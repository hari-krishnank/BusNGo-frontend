import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IconPipe } from '../../pipes/icon.pipe';
import { SeatPreviewComponent } from '../../../pages/busOwner/seat-preview/seat-preview.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { FormField } from '../../../core/models/user/form-fields.interface';
import { rowAnimation, tableAnimation } from '../../animations/data-table.animation';
import { FormComponent } from '../form/form.component';
import { fadeInOut } from '../../animations/form.animations';

interface Column {
  key: string;
  label: string;
  type?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, IconPipe, SeatPreviewComponent, MatIconModule, MatPaginatorModule, MatInputModule, FormsModule, FormComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  animations: [tableAnimation, rowAnimation, fadeInOut]
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = [];
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() title: string = '';
  @Input() showActions: boolean = true;
  @Input() showAddNewButton: boolean = true;

  @Output() addNew = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();
  @Output() viewPreview = new EventEmitter<any>();

  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() showViewDetails: boolean = false;
  @Output() viewDetails = new EventEmitter<void>();

  @Input() showApproveOrReject: boolean = false;
  @Output() approveReject = new EventEmitter<{ action: 'approve' | 'reject', item: any }>();

  @Input() showBlockUnblock: boolean = false;
  @Output() blockUnblock = new EventEmitter<any>();

  dataSource!: MatTableDataSource<any>;
  searchForm !: FormGroup;
  searchFields: FormField[] = [
    {
      name: 'searchTerm',
      placeholder: 'Search',
      type: 'text',
      errors: [],
      label: 'Search....',
    }
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit() {
    this.updateDisplayedColumns();
    this.initializeDataSource();
    this.searchForm.get('searchTerm')?.valueChanges.subscribe(value => {
      this.onSearch({ searchTerm: value });
    });
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.columns.map(col => col.key);
    if (this.showActions) {
      this.displayedColumns.push('actions');
    }
    if (this.showViewDetails) {
      this.displayedColumns.push('viewDetails');
    }
    if (this.showBlockUnblock) {
      this.displayedColumns.push('blockUnblock');
    }
    if (this.showApproveOrReject) {
      this.displayedColumns.push('approveReject');
    }
  }

  initializeDataSource() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.createFilter();
  }

  createFilter(): (data: any, filter: string) => boolean {
    return (data: any, filter: string): boolean => {
      if (!filter) return true;

      const lowercaseFilter = filter.toLowerCase().trim();
      return this.columns.some(col => {
        const value = data[col.key];
        return value && String(value).toLowerCase().includes(lowercaseFilter);
      });
    };
  }

  onAddNew() {
    this.addNew.emit();
  }

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onDelete(item: any) {
    this.delete.emit(item);
  }

  onBlockUnblock(item: any) {
    this.blockUnblock.emit(item);
  }

  onApprove(item: any) {
    this.approveReject.emit({ action: 'approve', item });
  }

  onReject(item: any) {
    this.approveReject.emit({ action: 'reject', item });
  }

  onViewDetails(item: any) {
    this.viewDetails.emit(item);
  }

  onSearch(formValue: any) {
    const searchTerm = formValue.searchTerm;
    console.log('Search term in DataTableComponent:', searchTerm);
    this.dataSource.filter = searchTerm.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.search.emit(searchTerm);
    this.data = this.dataSource.filteredData;
  }

  onViewPreview(element: any) {
    this.viewPreview.emit(element);
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }
}