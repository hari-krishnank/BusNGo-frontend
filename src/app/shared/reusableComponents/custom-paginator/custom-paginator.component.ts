import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.css'
})
export class CustomPaginatorComponent {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Output() page = new EventEmitter<{ pageIndex: number, pageSize: number }>();

  firstPage() {
    if (this.pageIndex !== 0) {
      this.pageIndex = 0;
      this.emitPageEvent();
    }
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.emitPageEvent();
    }
  }

  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.length) {
      this.pageIndex++;
      this.emitPageEvent();
    }
  }

  lastPage() {
    const lastPageIndex = Math.ceil(this.length / this.pageSize) - 1;
    if (this.pageIndex !== lastPageIndex) {
      this.pageIndex = lastPageIndex;
      this.emitPageEvent();
    }
  }

  private emitPageEvent() {
    this.page.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    });
  }
}
