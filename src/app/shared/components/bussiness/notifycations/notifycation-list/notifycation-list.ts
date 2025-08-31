import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifycation-list',
  imports: [CommonModule],
  templateUrl: './notifycation-list.html',
  styleUrl: './notifycation-list.scss'
})
export class NotifycationList {
  notifications: any[] = [
    {
      title: 'TODAY',
      child: [
        {
          data: '79.00',
          subtitle: [ 'Richard Jones', 'has purchased Hạt Mềm Cho Chó Trưởng Thành Zenith Adult' ],
          icon: 'pi pi-dollar',
          color: 'text-(--p-sky-500)',
          bgColor: 'bg-(--p-sky-100)'
        },
        {
          data: '79.00',
          subtitle: [ 'Your request for withdrawal of', 'has been initiated' ],
          icon: 'pi pi-dollar',
          color: 'text-(--p-primary-500)',
          bgColor: 'bg-(--p-primary-100)'
        },
      ]
    },
    {
      title: 'YESTERDAY',
      child: [
        {
          subtitle: ['Keyser Wick', 'has posted a new questions about your product.'],
          icon: 'pi pi-dollar',
          color: 'text-(--p-sky-500)',
          bgColor: 'bg-(--p-sky-100)'
        },
        {
          data: '79.00',
          subtitle: ['Your revenue has increased by', ''],
          icon: 'pi pi-dollar',
          color: 'text-(--p-green-500)',
          bgColor: 'bg-(--p-green-100)'
        }
      ]
    }
  ];
  
}
