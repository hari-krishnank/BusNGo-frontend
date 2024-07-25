import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

interface Column {
  key: string;
  label: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = [];
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() title: string = '';
  @Output() addNew = new EventEmitter<void>();

  ngOnInit() { 
    this.updateDisplayedColumns();
  }

  updateDisplayedColumns() {
    this.displayedColumns = this.columns.map(col => col.key);
    this.displayedColumns.push('actions');
  }

  onAddNew() {
    this.addNew.emit();
  }
}