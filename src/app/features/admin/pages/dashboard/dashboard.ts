import { Component, inject } from '@angular/core';
import { AdminSidebar } from '../../components/admin-sidebar/admin-sidebar';
import { Table } from '../../../../shared/components/ui/table/table';
import { TailwindBreakpoint } from '../../../../shared/services/tailwind-breakpoint/tailwind-breakpoint';
import { CommonModule } from '@angular/common';
import { BarChart } from '../../../../shared/components/ui/chart/bar-chart/bar-chart';
import { SummaryCard } from '../../../../shared/models/common.model';
import { BestSelling } from '../../../../shared/components/bussiness/analytics/best-selling/best-selling';
import { NotifycationList } from '../../../../shared/components/bussiness/notifycations/notifycation-list/notifycation-list';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AdminSidebar, Table, BarChart, BestSelling, NotifycationList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  tbpService = inject(TailwindBreakpoint);
  isDesktop$ = this.tbpService.isDesktop$;
  items: any[] = [
    {
      image: 'https://via.placeholder.com/50',
      name: 'Wireless Mouse',
      price: 250000,
      view: 120
    },
    {
      image: 'https://via.placeholder.com/50',
      name: 'Mechanical Keyboard',
      price: 850000,
      view: 340
    },
    {
      image: 'https://via.placeholder.com/50',
      name: 'USB-C Hub',
      price: 450000,
      view: 89
    },
    {
      image: 'https://via.placeholder.com/50',
      name: 'Laptop Stand',
      price: 320000,
      view: 210
    }
  
  ];
  summaryCard: SummaryCard[] = [
    { title: 'Orders', data: '152', subtitle: ['24 new', 'since last visit'], icon: 'pi pi-shopping-cart' },
    { title: 'Revenue', data: '$2.100', subtitle: ['%52+', 'since last week'], icon: 'pi pi-dollar' },
    { title: 'Customers', data: '28441', subtitle: ['520', 'newly registered'], icon: 'pi pi-users' },
    { title: 'Comments', data: '152 Unread', subtitle: ['85', 'responded'], icon: 'pi pi-comment' },
  ]
  cartColumns: { field: string; header: string; sortable?: boolean }[] = [
    { field: 'image', header: 'Image', sortable: false },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'price', header: 'Price', sortable: true },
    { field: 'view', header: 'View', sortable: false },
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
