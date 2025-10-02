import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input, NO_ERRORS_SCHEMA, TemplateRef, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Product } from '../../../models/product.model';
import { Button } from "primeng/button";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  imports: [NgTemplateOutlet, CommonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, Button, ButtonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class myTable {
  @Input() data!: any[];
  @Input() columns: { field: string; header: string; sortable?: boolean }[] = [];
  @Input() exRowcolums: { field: string; header: string; sortable?: boolean }[] = [];

  @Input() headerTemplate?:  TemplateRef<any>;
  @Input() rowTemplate?: TemplateRef<any>;
  @Input() exRowTemplate?: TemplateRef<any>;
  @Input() footerTemplate?: TemplateRef<any>;

  @Input() paginator: boolean = false;
  @Input() rows: number = 10;

  @Input() sortable: boolean = false;
  @Input() searchable: boolean = false;
  @Input() globalFilterFields: any[] = [];
  @Input() dataKey: string = '';
  @Input() captionMode: 'search' | 'expand' | 'none' = 'none';

  @ViewChild('dt2') dt2!: Table;
  selectedProducts!: Product;
  expandedRows = {};

  isImagePath(value: any): boolean {
    if (typeof value !== 'string') return false;
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(value);
  };

  clear(table: Table) {
    table.clear();
  };

  onGlobalFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.dt2.filterGlobal(value, 'contains');
  };
  expandAll() {
    // dataKey: id
    this.expandedRows = this.data.reduce((acc, p) => (acc[p[this.dataKey]] = true) && acc, {});
  };
  collapseAll() {
    this.expandedRows = {};
  };
}
