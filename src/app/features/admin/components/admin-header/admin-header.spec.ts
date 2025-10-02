import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeader } from './admin-header';
import { provideRouter } from '@angular/router';
import { Drawer } from 'primeng/drawer';

describe('AdminHeader', () => {
  let component: AdminHeader;
  let fixture: ComponentFixture<AdminHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHeader],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle drawer visibility', () => {
    component['visible'] = false;
    component.toggleDrawer();
    expect(component['visible']).toBeTrue();
  
    component.toggleDrawer();
    expect(component['visible']).toBeFalse();
  });
  it('should call drawerRef.close with event', () => {
    const mockEvent = new Event('click');
    component['drawerRef'] = {
      close: jasmine.createSpy('close')
    } as unknown as Drawer;
    component.closeCallback(mockEvent);
  
    expect(component['drawerRef'].close).toHaveBeenCalledWith(mockEvent);
  });
  
  
});
