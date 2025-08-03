import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Megamenu } from '../../../../shared/components/layout/megamenu/megamenu';
import { Drawer } from '../../../../shared/components/ui/drawer/drawer';
import { ButtonModule } from 'primeng/button';
import { Category } from '../../../../shared/models/common.model';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../../../shared/services/user-service/user-service';
import { AuthService } from '../../../../shared/services/auth-service/auth-service';
import { UserDrawer } from '../../../../shared/components/ui/user-drawer/user-drawer';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, Megamenu, Drawer, UserDrawer, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  category: Category[] = [
    {
      cateId: 'Chó',
      cateNameList: [
        { cateName: 'Đi đến Chó' },
        {
          cateName: ['Thức ăn cho Chó'],
          cateChild: [
            'Đi đến Thức ăn cho Chó',
            'Thức ăn hạt',
            'Thức ăn ướt',
            'Hỗ trợ điều trị bệnh',
            'Thức ăn hữu cơ'
          ]
        }
      ]
    },
    {
      cateId: 'Mèo',
      cateNameList: [
        { cateName: 'Đi dến Mèo' },
        {
          cateName: 'Thức ăn cho Mèo',
          cateChild: [
            'Đi đến thức ăn cho Mèo',
            'Thức ăn hạt',
            'Thức ăn ướt',
            'Hỗ trợ điều trị bệnh',
            'Thức ăn cho mèo con'
          ]
        }
      ]
    },
    { cateId: 'Thiết bị thông minh' },
    { cateId: 'Hàng mới về' },
    { cateId: 'Thương hiệu' },
    { cateId: 'News' },
    { cateId: 'Today\'s Sale' }
  ];
  isNavHidden = false;
  private authService = inject(AuthService);
  isLogedIn: boolean = false;

  // scroll navBar
  @HostListener('window:scroll', [])
  onScroll(): void {
    const y = window.scrollY;
    this.isNavHidden = y > 138;  
  }  
}
