import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dataview } from './dataview';

describe('Dataview', () => {
  let component: Dataview;
  let fixture: ComponentFixture<Dataview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dataview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dataview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
