import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  imports: [PaginatorModule],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss'
})
export class Paginator implements OnInit {
  @Input() totalRecs: number = 0;
  @Input() rows: number = 10;
  @Output() pageChange = new EventEmitter();

  
  ngOnInit(): void {
  };
  
  onPageChange(event: PaginatorState) {
    this.pageChange.emit(event)
  };
}
