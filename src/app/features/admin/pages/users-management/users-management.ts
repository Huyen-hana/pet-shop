import { Component, inject, OnInit, signal } from '@angular/core';
import { myTable } from '../../../../shared/components/ui/table/table';
import { UserService } from '../../../../shared/services/user-service/user-service';
import { User } from '../../../../shared/models/user.model';
import { DateTimePipe } from '../../../../shared/pipes/date-time/date-time-pipe';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../shared/models/order.model';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { Tag } from "primeng/tag";

@Component({
  selector: 'app-users-management',
  imports: [myTable, CommonModule, DateTimePipe, Tag ],
  templateUrl: './users-management.html',
  styleUrl: './users-management.scss'
})
export class UsersManagement implements OnInit {
  users = signal<User[]>([]);
  orders = signal<Order[]>([]);
  private userService = inject(UserService);
  private productService = inject(ProductService);

  cartColumns: { field: string; header: string; sortable?: boolean }[] = [
    { field: 'id', header: 'Id' },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'phone', header: 'Phone' },
    { field: 'fullName', header: 'Name', sortable: true },
    { field: 'role', header: 'Role', sortable: true },
    { field: 'createdAt', header: 'Created At', sortable: true },
  ];

  orderCartColumns: { field: string; header: string; sortable?: boolean }[] = [
    { field: '', header: 'Ex' },
    { field: 'orderId', header: 'OrderId', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'phone', header: 'Phone' },
    { field: 'address', header: 'Address' },
    { field: 'paymentMethod', header: 'Payment Method', sortable: true },
    { field: 'createdAt', header: 'Created At', sortable: true },
    { field: 'totalAmount', header: 'Total', sortable: true },
    { field: 'orderStatus', header: 'Status', sortable: true },
  ];
  orderCartColEx: { field: string; header: string; sortable?: boolean }[] = [
    { field: 'productId', header: 'Id', sortable: true },
    { field: 'productName', header: 'Name', sortable: true },
    { field: 'unitPrice', header: 'Price', sortable: true },
    { field: 'quantity', header: 'Quantity', sortable: true },
  ];
  
  ngOnInit(): void {
    this.renderUsers();
    this.renderOrders();
  };

  renderUsers() {
    this.userService.getAllUser().subscribe({
      next: (res) => {
        this.users.set(res);
      },
      error: e => console.log(e)
    })
  };

  renderOrders() {
    this.productService.getOrder().subscribe({
      next: (res) => {
        this.orders.set(res);
      },
      error: e => {
        console.error(e);
      }
    });
  };

  getSevere(status: string): string {
    switch (status) {
      case 'Pending Confirmation':
        return 'secondary';
      case 'Confirmed':
        return 'contrast';
      case 'Preparing Items':
        return 'warning';
      case 'Shipping':
        return 'info';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    };
  };
  getStatus(status: string): string {
    switch (status) {
      case 'Pending Confirmation':
        return 'Pending';
      case 'Confirmed':
        return 'Confirmed';
      case 'Preparing Items':
        return 'Preparing';
      case 'Shipping':
        return 'Shipping';
      case 'Delivered':
        return 'Delivered';
      case 'Cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    };
  }

}
