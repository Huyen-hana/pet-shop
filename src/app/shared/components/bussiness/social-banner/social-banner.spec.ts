import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBanner } from './social-banner';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Photo } from '../../../services/business/photo-service';
import { Image } from '../../../models/common.model';

describe('SocialBanner', () => {
  let component: SocialBanner;
  let fixture: ComponentFixture<SocialBanner>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockPhotoService: Partial<Photo>;

  const mockImages: Image[] = [
    {
      itemImageSrc: 'assets/img1.jpg',
      thumbnailImageSrc: 'assets/thumb1.jpg',
      alt: 'Image 1',
      title: 'Title 1',
      idImg: 'img1',
      routerLink: '/product/1'
    },
    {
      itemImageSrc: 'assets/img2.jpg',
      thumbnailImageSrc: 'assets/thumb2.jpg',
      alt: 'Image 2',
      title: 'Title 2',
      idImg: 'img2',
      routerLink: '/product/2'
    }];

  beforeEach(async () => {
    mockPhotoService = {
      images: mockImages
    };
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [SocialBanner],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign images from photoService', () => {
    (component as any).photoService.images = mockImages;
    component.renderImages();
    expect(component.images).toEqual(mockImages);
  });
  it('should assign empty array if photoService.images is undefined', () => {
    (component as any).photoService.images = undefined;
    component.renderImages();
    expect(component.images).toEqual([]);
  });

  it('should navigate when routerLink is provided', () => {
    component.navigateTo('/home');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set fallback image on error', () => {
    const imgElement = document.createElement('img');
    imgElement.src = 'broken-link.jpg';
    const errorEvent = new Event('error');
    Object.defineProperty(errorEvent, 'target', { value: imgElement });
  
    component.onImageError(errorEvent);
  
    expect(imgElement.src).toContain('assets/images/social-banner/banner01.png');
  });
  

});
