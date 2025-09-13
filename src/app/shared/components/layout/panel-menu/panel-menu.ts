import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel-menu',
  imports: [PanelMenuModule],
  templateUrl: './panel-menu.html',
  styleUrl: './panel-menu.scss'
})
export class PanelMenu {
  menu: MenuItem[] = [];
  activatedRoute = inject(ActivatedRoute);

  @Input() category: any[] = [];
  @Output() itemClicked = new EventEmitter<void>();

  ngOnInit(): void {
    // console.log(this.category)
    this.renderPanelMenu();
  };

  renderPanelMenu() {
    this.menu = (this.category || []).map(parent => ({
      label: parent.cateId,
      items: (parent.cateNameList || []).map((nameItem: any) => {
        const label = Array.isArray(nameItem.cateName)
          ? nameItem.cateName[0]
          : nameItem.cateName;
  
        const hasChild = Array.isArray(nameItem.cateChild) && nameItem.cateChild.length > 0;
  
        return hasChild
          ? {
              label,
              items: nameItem.cateChild.map((child: any) => ({
                label: child,
                routerLink: ['/main/collections'],
                command: () => this.itemClicked.emit()
              }))
            }
          : { label,
              routerLink: nameItem.routerLink || ['/main/collections'],
              command: () => this.itemClicked.emit()
            };
      })
    }));
  
  };

  //define color scheme for amber panel
  amberPanel = {
    colorScheme: {
      light: {
        item: {
          focusColor: '#b45309',
          focusBackground: '#fffbeb',
        }
      }
    }
  }
}
