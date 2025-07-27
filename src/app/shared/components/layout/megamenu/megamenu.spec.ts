import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Megamenu } from './megamenu';

describe('Megamenu', () => {
  let component: Megamenu;
  let fixture: ComponentFixture<Megamenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Megamenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Megamenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
