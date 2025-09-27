import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPanel } from './filter-panel';

describe('FilterPanel', () => {
  let component: FilterPanel;
  let fixture: ComponentFixture<FilterPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedCateName and emit sortChanged and closeDrawer', () => {
    spyOn(component.sortChanged, 'emit');
    spyOn(component.closeDrawer, 'emit');
    component.panelId = 'panel-123';
    component.onSortChange('Category A');
  
    expect(component.selectedCateName).toBe('Category A');
    expect(component.sortChanged.emit).toHaveBeenCalledWith({
      source: 'panel-123',
      value: ['Category A']
    });
    expect(component.closeDrawer.emit).toHaveBeenCalled();
  });
  
});
