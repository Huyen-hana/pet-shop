import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterSection } from '../../../../shared/models/common.model';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, PanelModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  // footer: FooterSection[] = [];
  
  footer: FooterSection[] = [
    {
      title: 'Shop',
      childs: [
        {
          name: 'Dành cho Chó',
          params: ''
        },
        {
          name: 'Dành cho Mèo',
          params: ''
        },
        {
          name: 'Thương hiệu',
          params: 'brands'
        },
        {
          name: 'Blogs',
          params: 'blogs'
        },
        {
          name: 'Bộ sưu tập',
          params: 'collections'
        }
      ]
    },
    {
      title: 'Pet Shop',
      childs: [
        { name: 'Giới thiệu' },
        { name: 'Thành viên' },
        { name: 'Điều khoản sử dụng' },
        { name: 'Tuyển dụng' }
      ]
    },
    {
      title: 'Hỗ trợ khách hàng',
      childs: [
        { name: 'Chính sách đổi trả' },
        { name: 'Phương thức vận chuyển' },
        { name: 'Chính sách bảo mật' },
        { name: 'Phương thức thanh toán' },
        { name: 'Chính sách hoàn tiền' }
      ]
    },
    {
      title: 'Liên hệ',
      childs: [
        { name: 'CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ DỊCH VỤ PET SHOP' },
        { name: 'MST: 0233456789' },
        { name: '123, đường số, Phường, TP.Hồ Chí Minh, Việt Nam' },
        { name: 'Hotline: 0123454321' },
        { name: 'Email: pet-shop@gmail.com' }
      ]
    }
  ];

  amberPanel = {
    root: {
      borderColor: 'none',
      background: 'transparent'
    }
  }
}


