import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchService } from './search-service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show() is called', fakeAsync(() => {
    let result: boolean | undefined;
    service.visibility$.subscribe(value => result = value);
    service.show();
    tick();
    expect(result).toBeTrue();
  }));

  it('should emit false when hide() is called', fakeAsync(() => {
    let result: boolean | undefined;
    service.visibility$.subscribe(value => result = value);
    service.hide();
    tick();
    expect(result).toBeFalse();
  }));

  it('should toggle from false to true', fakeAsync(() => {
    let result: boolean | undefined;
    service.visibility$.subscribe(value => result = value);
    service.toggle(); // mặc định là false → true
    tick();
    expect(result).toBeTrue();
  }));

});
