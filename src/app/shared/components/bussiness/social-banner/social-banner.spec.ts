import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialBanner } from './social-banner';

describe('SocialBanner', () => {
  let component: SocialBanner;
  let fixture: ComponentFixture<SocialBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
