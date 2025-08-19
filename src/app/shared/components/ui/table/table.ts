import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  imports: [NgTemplateOutlet, CommonModule, TableModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table {
  @Input() data: any[] = [];
  @Input() columns: { field: string; header: string }[] = [];

  @Input() headerTemplate?:  TemplateRef<any>;
  @Input() rowTemplate?: TemplateRef<any>;
  @Input() footerTemplate?: TemplateRef<any>;

  @Input() paginator: boolean = false;
  @Input() rows: number = 10;

  @Input() sortable: boolean = false;
  @Input() searchable: boolean = false;
 
}
