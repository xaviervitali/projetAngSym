import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input()
  currentPage = 1;
  @Input()
  items: number;
  @Input()
  itemsPerPage = 10;
  @Output()
  pageChange = new EventEmitter<number>();

  pages = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChange | any) {
    if (!changes.items) {
      return;
    }

    const pagesCount = Math.ceil(this.items / this.itemsPerPage);
    this.pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      this.pages.push(i);
    }
  }
  handlePageClick(pageNumber: number) {
    this.pageChange.emit(pageNumber);
  }
}
