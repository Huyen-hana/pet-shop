import { Component, EventEmitter, Output } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { StyleClass } from 'primeng/styleclass';
import { MenuCategory } from '../../../../shared/models/common.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [DrawerModule, StyleClass, RouterLink],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss'
})
export class AdminSidebar {
  @Output() closeDrawer = new EventEmitter<Event>();
  menuItems: MenuCategory[] = [
    {
      key: 'home',
      label: 'HOME',
      items: [
        {
          key: 'dashboard',
          label: 'Dashboard',
          routerLink: '/admin/dashboard',
          icon: 'pi pi-home'
        }
      ]
    },
    {
      key: 'ui',
      label: 'UI COMPONENTS',
      items: [
        { key: 'form-layout', label: 'Form Layout', routerLink: undefined, icon: 'pi pi-fw pi-id-card' },
        { key: 'input', label: 'Input', routerLink: undefined, icon: 'pi pi-fw pi-id-card' },
        { key: 'button', label: 'Button', routerLink: undefined, icon: 'pi pi-fw pi-id-card' },
        { key: 'table', label: 'Table', icon: 'pi pi-fw pi-id-card',
          items: [
            {
              key: 'tbProducts', label: 'Products', routerLink: `/admin/ui-kid/table/tbProducts`
            },
            {
              key: 'tbUsers', label: 'Users', routerLink: '/admin/ui-kid/table/tbUsers'
            }
          ]
         },
        { key: 'list', label: 'List', routerLink: undefined, icon: 'pi pi-fw pi-id-card' },
        { key: 'tree', label: 'Tree', routerLink: undefined, icon: 'pi pi-fw pi-id-card' },
        { key: 'panel', label: 'Panel', routerLink: undefined, icon: 'pi pi-fw pi-id-card' },
        { key: 'overlay', label: 'Overlay', routerLink: undefined },
        { key: 'media', label: 'Media', routerLink: undefined },
        { key: 'menu', label: 'Menu', routerLink: undefined },
        { key: 'message', label: 'Message', routerLink: undefined },
        { key: 'file', label: 'File', routerLink: undefined },
        { key: 'chart', label: 'Chart', routerLink: undefined },
        { key: 'timeline', label: 'Timeline', routerLink: undefined },
        { key: 'misc', label: 'Misc', routerLink: undefined }
      ]
    },
    {
      key: 'pages',
      label: 'PAGES',
      items: [
        { key: 'landing', label: 'Landing', routerLink: undefined, icon: 'pi pi-fw pi-id-card' },
        { key: 'auth', label: 'Auth',
          items: [
            { key: 'login', label: 'Login', routerLink: '' },
            { key: 'register', label: 'Register', routerLink: '' }
          ]  
        },
        { key: 'crud', label: 'Crud', icon: 'pi pi-fw pi-id-card' },
        { key: 'not-found', label: 'Not Found', icon: 'pi pi-fw pi-id-card' },
        { key: 'empty', label: 'Empty', icon: 'pi pi-fw pi-id-card' }
      ]
    },
    {
      key: 'hierarchy',
      label: 'Hierarchy',
      items: [
        {
          key: 'submenu1',
          label: 'Submenu 1',
          items: [
            { key: 'sub1a', label: 'Sub 1A', routerLink: undefined },
            { key: 'sub1b', label: 'Sub 1B', routerLink: undefined }
          ]
        },
        {
          key: 'submenu2',
          label: 'Submenu 2',
          items: [
            { key: 'sub2a', label: 'Sub 2A', routerLink: undefined },
            { key: 'sub2b', label: 'Sub 2B', routerLink: undefined }
          ]
        }
      ]
    },
    {
      key: 'get-started',
      label: 'Get Started',
      items: [
        { key: 'docs', label: 'Documentation', routerLink: undefined },
        { key: 'source', label: 'View Source', routerLink: undefined }
      ]
    }  
  ];

  onItemClick(event: Event): void {
    this.closeDrawer.emit(event);
  };
  
}
