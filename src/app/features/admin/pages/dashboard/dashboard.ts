import { Component, inject } from '@angular/core';
import { myTable } from '../../../../shared/components/ui/table/table';
import { CommonModule } from '@angular/common';
import { BarChart } from '../../../../shared/components/ui/chart/bar-chart/bar-chart';
import { SummaryCard } from '../../../../shared/models/common.model';
import { BestSelling } from '../../../../shared/components/bussiness/analytics/best-selling/best-selling';
import { NotifycationList } from '../../../../shared/components/bussiness/notifycations/notifycation-list/notifycation-list';
import { ProductState } from '../../../../shared/services/state/product-state';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, myTable, BarChart, BestSelling, NotifycationList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  public state = inject(ProductState);

  constructor() {
    console.log(this.state.reccentSales())
  }

  summaryCard: SummaryCard[] = [
    { title: 'Orders', data: '152', subtitle: ['24 new', 'since last visit'], icon: 'pi pi-shopping-cart' },
    { title: 'Revenue', data: '$2.100', subtitle: ['%52+', 'since last week'], icon: 'pi pi-dollar' },
    { title: 'Customers', data: '28441', subtitle: ['520', 'newly registered'], icon: 'pi pi-users' },
    { title: 'Comments', data: '152 Unread', subtitle: ['85', 'responded'], icon: 'pi pi-comment' },
  ]
  cartColumns: { field: string; header: string; sortable?: boolean }[] = [
    { field: 'imageUrl', header: 'Image', sortable: false },
    { field: 'productId', header: 'Id', sortable: true },
    { field: 'productName', header: 'Name', sortable: true },
    { field: 'unitPrice', header: 'Price', sortable: false },
  ];

  basicOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: {
      x: { ticks: { color: '#000' } },
      y: { ticks: { color: '#000' } },
    }
  };
}
