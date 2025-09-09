import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSelling } from './best-selling';

describe('BestSelling', () => {
  let component: BestSelling;
  let fixture: ComponentFixture<BestSelling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSelling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSelling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
