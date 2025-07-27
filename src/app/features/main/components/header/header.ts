import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Megamenu } from '../../../../shared/components/layout/megamenu/megamenu';
import { Drawer } from '../../../../shared/components/ui/drawer/drawer';
import { ButtonModule } from 'primeng/button';
import { Category } from '../../../../shared/models/common.model';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, Megamenu, Drawer, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {

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

  ngOnInit(): void {
    
  }

  // scroll navBar
  @HostListener('window:scroll', [])
  onScroll(): void {
    const y = window.scrollY;
    this.isNavHidden = y > 138;  
  }  
}
