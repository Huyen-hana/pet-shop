import { Component, Input, OnInit } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { Category } from '../../../models/common.model';

@Component({
  selector: 'app-megamenu',
  imports: [MegaMenuModule],
  templateUrl: './megamenu.html',
  styleUrl: './megamenu.scss'
})
export class Megamenu implements OnInit {
  cateMenu: MegaMenuItem[] = [];
  @Input() category!: Category[];

  ngOnInit(): void {
    this.renderCateMenu();
  };

  // customize style for p-megamenu
  mycateMenu = {
    root: {
      borderRadius: '6px',
      horizontalOrientation: {
        padding: '3px 3px'
      }
    },
    colorScheme: {
      light: {
        root: {
          background: '#ffffff',
          borderColor: 'none'
        },
        item: {
          focusBackground: '#fffbeb',

          focusColor: '#b45309',
          activeColor: '#f59e0b'
        }
      }
    }
  }

  renderCateMenu():void {
    this.cateMenu = [
      {
        label: 'Chó',
        items: [
          [
            {     //pmegamenu-sub > ul
              label: 'Thức ăn cho Chó',
              items: [
                {     //li
                  label: 'Thức ăn hạt'
                },
                {
                  label: 'Thức ăn ướt'
                },
                {
                  label: 'Hỗ trợ điều trị bệnh'
                },
                {
                  label: 'Thức ăn hữu cơ'
                }
              ]
            }
          ],

          [
            {
              label: 'Bánh thưởng',
              items: [
                {
                  label: 'Casual'
                }
              ]
            }
          ],
          
          [
            {
              label: 'Chăm sóc sức khỏe'
            }
          ],

          [
            {
              label: 'Danh mục chung',
              items: [
                { label: 'Đi đến Chó', routerLink: '/main/collections/dog' },
                { label: 'Thức ăn cho Chó' },
                { label: 'Bánh thưởng' },
                { label: 'Chăm sóc sức khỏe' }
              ]
            }
          ]

        ]
      },

      {
        label: 'Mèo',
        items: [
          [
            {     //pmegamenu-sub > ul
              label: `Thức ăn cho Mèo`,
              items: [
                {     //li
                  label: `Thức ăn hạt`,
                  routerLink: '/products'
                },
                {
                  label: `Thức ăn ướt`
                },
                {
                  label: 'Hỗ trợ điều trị bệnh'
                }
              ]
            }
          ],
          [
            {
              label: 'Danh mục chung',
              items: [
                { label: 'Đi đến mèo', routerLink: '/main/collections/cat' },
                { label: 'Thức ăn cho Mèo' }
              ]
            }
          ]
        ]
      },

      {
        label: 'Thiết bị thông minh'
      },
      {
        label: 'Hàng mới về'
      },
      {
        label: 'Thương hiệu'
      },
      {
        label: 'News'
      },
      {
        label: 'Today\'s Sale'
      }
    ]
  
  };

}
