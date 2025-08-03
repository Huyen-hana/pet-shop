import { Component, inject } from '@angular/core';
import { SocialBanner } from '../../../../shared/components/bussiness/social-banner/social-banner';
import { Photo } from '../../../../shared/services/business/photo-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SocialBanner, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  policies = [
    {
      title: 'Miễn Phí Vận Chuyển',
      icon: 'pi pi-map-marker'
    },
    {
      title: 'Sản Phẩm Chính Hãng',
      icon: 'pi pi-verified'
    },
    {
      title: 'Thanh Toán Tiện Lợi',
      icon: 'pi pi-wallet'
    },
    {
      title: 'Hỗ Trợ Chuyên Nghiệp',
      icon: 'pi pi-whatsapp'
    },
  ]

  private photoService = inject(Photo);
  brands = this.photoService.brands;

}
