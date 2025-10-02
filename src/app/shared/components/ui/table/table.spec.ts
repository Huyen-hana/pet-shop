import { ComponentFixture, TestBed } from '@angular/core/testing';
import { myTable } from './table';


describe('Table', () => {
  let component: myTable;
  let fixture: ComponentFixture<myTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [myTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(myTable);
    component = fixture.componentInstance;
    component.dt2 = jasmine.createSpyObj('Table', ['filterGlobal']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call clear() on the provided table', () => {
    const tableMock = jasmine.createSpyObj('Table', ['clear']);
    component.clear(tableMock);
    expect(tableMock.clear).toHaveBeenCalled();
  });
  it('should call filterGlobal with input value', () => {
    component.dt2 = jasmine.createSpyObj('Table', ['filterGlobal']);
    const input = document.createElement('input');
    input.value = 'search text';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: input });
  
    component.onGlobalFilter(event);
  
    expect(component.dt2.filterGlobal).toHaveBeenCalledWith('search text', 'contains');
  });

  it('should expand all rows based on dataKey', () => {
    component.data = [
      { id: 1, name: 'Sản phẩm A' },
      { id: 2, name: 'Sản phẩm B' }
    ];
    component.dataKey = 'id';
    component.expandAll();
    expect(component.expandedRows).toEqual({
      1: true,
      2: true
    });
  });
  it('should collapse all rows by clearing expandedRows', () => {
    component.expandedRows = {
      1: true,
      2: true
    };
    component.collapseAll();
    expect(component.expandedRows).toEqual({});
  });
  
  
});
