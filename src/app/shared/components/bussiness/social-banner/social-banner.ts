import { Component, inject } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { Image } from '../../../../shared/models/common.model';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Photo } from '../../../services/business/photo-service';

@Component({
  selector: 'app-social-banner',
  imports: [GalleriaModule],
  templateUrl: './social-banner.html',
  styleUrl: './social-banner.scss'
})
export class SocialBanner {
  images: Image[] = [];
  responsiveOptions: any[] = [];
  private route = inject(Router);
  private photoService = inject(Photo)

  ngOnInit(): void {
    this.renderImages();
  }

  renderImages(): void {
    this.images = this.photoService.images || [];
  }

  navigateTo(routerLink: string): void {
    if (routerLink) {
      this.route.navigate([routerLink]);
    }
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default.jpg';
  }
  

}
