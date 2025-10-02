import { TestBed } from '@angular/core/testing';

import { Loading } from './loading';
import { take } from 'rxjs';

describe('Loading', () => {
  let service: Loading;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loading);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when show() is called', (done) => {
    service.show();
    service.isLoading$.pipe(take(1)).subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });  

  it('should emit false when hide() is called', (done) => {
    service.isLoading$.pipe(take(1)).subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
    service.hide();
  });  

  it('should emit true when showBtnLoading() is called', (done) => {
    service.showBtnLoading();
    service.isBtnLoading$.pipe(take(1)).subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });
  
  it('should emit false when hideBtnLoading() is called', (done) => {
    service.isBtnLoading$.pipe(take(1)).subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
    service.hideBtnLoading();
  });  

});
