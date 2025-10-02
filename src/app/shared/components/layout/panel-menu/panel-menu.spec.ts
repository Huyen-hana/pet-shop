import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelMenu } from './panel-menu';
import { provideRouter } from '@angular/router';

describe('PanelMenu', () => {
  let component: PanelMenu;
  let fixture: ComponentFixture<PanelMenu>;
  let mockCategoryWithChild: any[];
  let mockCategoryWithRouterLink: any[];  

  beforeEach(async () => {
    mockCategoryWithChild = [
      {
        cateId: 'parent1',
        cateNameList: [
          {
            cateName: ['Child A'],
            cateChild: ['Sub A1']
          }
        ]
      }
    ];
    mockCategoryWithRouterLink = [
      {
        cateId: 'parent',
        cateNameList: [
          {
            cateName: 'Single Name',
            routerLink: ['/main/collections']
          }
        ]
      }
    ];

    await TestBed.configureTestingModule({
      imports: [PanelMenu],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create sub-items when cateChild exists', () => {
    spyOn(component.itemClicked, 'emit');
    component.category = mockCategoryWithChild;
    component.renderPanelMenu();
  
    const subItem = component.menu?.[0]?.items?.[0]?.items?.[0];
    expect(subItem?.label).toBe('Sub A1');
    expect(subItem?.routerLink).toEqual(['/main/collections']);
  
    subItem?.command?.({ item: subItem, originalEvent: new Event('click') });
    expect(component.itemClicked.emit).toHaveBeenCalled();
  });

  it('should create single item when cateChild is missing', () => {
    spyOn(component.itemClicked, 'emit');
    component.category = mockCategoryWithRouterLink;
    component.renderPanelMenu();
  
    const item = component.menu?.[0]?.items?.[0];
    expect(item?.label).toBe('Single Name');
    expect(item?.routerLink).toEqual(['/main/collections']);
  
    item?.command?.({ item, originalEvent: new Event('click') });
    expect(component.itemClicked.emit).toHaveBeenCalled();
  });  
  
  it('should handle cateName as string', () => {
    component.category = mockCategoryWithRouterLink;
    component.renderPanelMenu();
  
    const item = component.menu?.[0]?.items?.[0];
    expect(item?.label).toBe('Single Name');
    expect(item?.routerLink).toEqual(['/main/collections']);
  });  
  it('should not create sub-items if cateChild is null', () => {
    component.category = mockCategoryWithRouterLink;
    component.renderPanelMenu();
  
    const item = component.menu?.[0]?.items?.[0];
    expect(item?.label).toBe('Single Name');
    expect(item?.items).toBeUndefined();
  });  


});
