import { Component, inject, OnInit, signal } from '@angular/core';
import { myTable } from '../../../../shared/components/ui/table/table';
import { UserService } from '../../../../shared/services/user-service/user-service';
import { User } from '../../../../shared/models/user.model';
import { DateTimePipe } from '../../../../shared/pipes/date-time/date-time-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-management',
  imports: [myTable, CommonModule, DateTimePipe],
  templateUrl: './users-management.html',
  styleUrl: './users-management.scss'
})
export class UsersManagement implements OnInit {
  users = signal<User[]>([]);
  private userService = inject(UserService);

  cartColumns: { field: string; header: string; sortable?: boolean }[] = [
    { field: 'id', header: 'Id' },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'phone', header: 'Phone' },
    { field: 'fullName', header: 'Name', sortable: true },
    { field: 'role', header: 'Role', sortable: true },
    { field: 'createdAt', header: 'Created At', sortable: true },
  ];
  
  ngOnInit(): void {
    this.renderUsers();
  };

  renderUsers() {
    this.userService.getAllUser().subscribe({
      next: (res) => {
        this.users.set(res);
      },
      error: e => console.log(e)
    })
  };

}
