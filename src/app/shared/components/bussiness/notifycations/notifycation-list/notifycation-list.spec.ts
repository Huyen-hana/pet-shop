import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifycationList } from './notifycation-list';

describe('NotifycationList', () => {
  let component: NotifycationList;
  let fixture: ComponentFixture<NotifycationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifycationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifycationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
