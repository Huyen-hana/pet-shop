import {  Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from "primeng/button";
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { Drawer } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { TailwindBreakpoint } from '../../../../shared/services/tailwind-breakpoint/tailwind-breakpoint';


@Component({
  selector: 'app-admin-header',
  imports: [RouterLink, CommonModule, Button, AdminSidebar, Drawer, Menu],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss'
})
export class AdminHeader {
  visible: boolean = false;
  @ViewChild('drawerRef') drawerRef!: Drawer;

  private tbpService = inject(TailwindBreakpoint);
  isDesktop$ = this.tbpService.isDesktop$;

  items: MenuItem[] | undefined;
  
  toggleDrawer(): void {
    this.visible = !this.visible
  };

  closeCallback(e: Event): void {
    this.drawerRef.close(e);
  };

}
