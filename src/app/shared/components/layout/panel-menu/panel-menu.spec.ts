import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMenu } from './panel-menu';

describe('PanelMenu', () => {
  let component: PanelMenu;
  let fixture: ComponentFixture<PanelMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
