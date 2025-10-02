import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayout } from './admin-layout';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router';

describe('AdminLayout', () => {
  let component: AdminLayout;
  let fixture: ComponentFixture<AdminLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayout],
      providers: [
        provideHttpClient(),
        MessageService,
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
