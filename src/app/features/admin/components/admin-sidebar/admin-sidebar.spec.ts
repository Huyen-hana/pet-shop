import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidebar } from './admin-sidebar';
import { provideRouter } from '@angular/router';

describe('AdminSidebar', () => {
  let component: AdminSidebar;
  let fixture: ComponentFixture<AdminSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSidebar],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeDrawer event when item is clicked', () => {
    const mockEvent = new Event('click');
    spyOn(component.closeDrawer, 'emit');
    component.onItemClick(mockEvent);
  
    expect(component.closeDrawer.emit).toHaveBeenCalledWith(mockEvent);
  });
  
});
