import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeader } from '../components/admin-header/admin-header';
import { ProductState } from '../../../shared/services/state/product-state';
import { TailwindBreakpoint } from '../../../shared/services/tailwind-breakpoint/tailwind-breakpoint';
import { CommonModule } from '@angular/common';
import { AdminSidebar } from '../components/admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminHeader, AdminSidebar, CommonModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  public state = inject(ProductState);
  tbpService = inject(TailwindBreakpoint);
  isDesktop$ = this.tbpService.isDesktop$;

  ngOnInit(): void {
    this.state.loadOrder();
  };
}
