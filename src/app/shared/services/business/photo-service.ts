import { inject, Injectable } from '@angular/core';
import { Image } from '../../models/common.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Photo {
  photoUrl: string = '';

  private http = inject(HttpClient);

    //fake data
    images: Image[] = [
      {
        itemImageSrc: 'https://paddy.vn/cdn/shop/files/paddy-D7-GO_1880_x_720_px_f5009950-b3e1-4022-abdc-2c4781e3f2bf.jpg?v=1752640504&width=1880',
        thumbnailImageSrc: '',
        alt: '',
        title: '',
        idImg: '1',
        routerLink: '/main/product/:id'
      },
      {
        itemImageSrc: 'https://paddy.vn/cdn/shop/files/paddy-natural-core_1880_x_720_px.png?v=1748848766&width=1880',
        thumbnailImageSrc: '',
        alt: '',
        title: '',
        idImg: '2',
        routerLink: '/main/product/:id'
      },
      {
        itemImageSrc: 'https://theme.hstatic.net/200000263355/1001161916/14/slide_3_img.jpg?v=135',
        thumbnailImageSrc: '',
        alt: '',
        title: '',
        idImg: '3',
        routerLink: '/main/product/:id'
      },
      
    ]

    //fake brand
    brands: any[] = [
      {
        name: 'Nutrience',
        img: 'https://paddy.vn/cdn/shop/files/nutrience_logo_510x.png?v=1671338493'
      },
      {
        name: 'Royal Canin',
        img: 'https://paddy.vn/cdn/shop/files/royal_canin_logo_bf62d31c-c2a2-4ec3-bc66-6eccdeffb5af_510x.png?v=1671338889'
      },
      {
        name: 'Equilibrio',
        img: 'https://paddy.vn/cdn/shop/files/equilibrio-logo-paddy_510x.jpg?v=1695891927'
      },
      {
        name: 'Kit Cat',
        img: 'https://paddy.vn/cdn/shop/files/kit_cat_logo_510x.png?v=1671342867'
      },
      {
        name: 'Tropiclean',
        img: 'https://paddy.vn/cdn/shop/files/tropiclean_logo_510x.png?v=1671341407'
      }
    ]

  // getImages(): Observable<Image[]> {
  //   return this.http.get<Image[]>(this.photoUrl)
  // }
}
