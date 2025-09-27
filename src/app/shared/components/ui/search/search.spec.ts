import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Search } from './search';
import { Product } from '../../../models/product.model';
import { Subject } from 'rxjs';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Search]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products based on search term', fakeAsync(() => {
    component.allProducts = [
      { name: 'Cát cho mèo' },
      { name: 'Hạt khô' },
      { name: 'Pate' }
    ] as Product[];

    (component as any).searchTerms = new Subject<string>();
    (component as any).initializeSearchStream();
    (component as any).searchTerms.next('cát');
  
    tick(300);
    expect(component.filteredProduct.length).toBe(1);
    expect(component.filteredProduct[0].name).toBe('Cát cho mèo');
  }));

  it('should update searchText and push query to searchTerms', () => {
    const mockSubject = new Subject<string>();
    const spy = spyOn(mockSubject, 'next');
    (component as any).searchTerms = mockSubject;
    component.onSearch({ query: 'meo' });

    expect(component.searchText).toBe('meo');
    expect(spy).toHaveBeenCalledWith('meo');
  });

  it('should navigate and hide search when productId exists', () => {
    spyOn((component as any).router, 'navigate');
    spyOn((component as any).searchService, 'hide');
    spyOn(component, 'clearSearch');
    const mockEvent = { value: { id: '123' } };
    component.onSelectProduct(mockEvent);
  
    expect((component as any).router.navigate).toHaveBeenCalledWith(['/main/products', '123']);
    expect((component as any).searchService.hide).toHaveBeenCalled();
    expect(component.clearSearch).toHaveBeenCalled();
  });  
  
  it('should clear searchText and filteredProduct', () => {
    component.searchText = 'Pate';
    component.filteredProduct = [{ name: 'Pate' }] as Product[];
    component.clearSearch();

    expect(component.searchText).toBe('');
    expect(component.filteredProduct).toEqual([]);
  });
  
  
});
