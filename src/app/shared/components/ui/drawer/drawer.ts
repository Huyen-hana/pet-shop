import { Component, Input } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { PanelMenu } from '../../layout/panel-menu/panel-menu';

@Component({
  selector: 'app-drawer',
  imports: [DrawerModule, PanelMenu],
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss'
})
export class menuDrawer {
  visibleMenu: boolean = false;

  @Input() titleMenu: string = 'Menu'
  @Input() category: any[] = [];
}
