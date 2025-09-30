import { TestBed } from '@angular/core/testing';

import { ErrorHandler } from './error-handler';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorHandler', () => {
  let service: ErrorHandler;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(ErrorHandler);
    spyOn(console, 'error');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to /error/404 for 404 error (not email check)', () => {
    const error = new HttpErrorResponse({
      status: 404,
      url: '/some-other-endpoint'
    });
    service.handleError(error);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/error/404']);
  });
  it('should NOT navigate for 404 error with email check', () => {
    const error = new HttpErrorResponse({
      status: 404,
      url: '/user?email=test@example.com'
    });
    service.handleError(error);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /error/500 for 500 error', () => {
    const error = new HttpErrorResponse({
      status: 500,
      url: '/api/data'
    });
    service.handleError(error);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/error/500']);
  });

  it('should navigate to /error/no-connection for status 0', () => {
    spyOn((service as any), 'showNetworkError');

    const error = new HttpErrorResponse({
      status: 0,
      url: '/api/data'
    });
    service.handleError(error);
    expect((service as any).showNetworkError).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/error/no-connection']);
  });

  it('should navigate to /error/500 for unknown status', () => {
    const error = new HttpErrorResponse({
      status: 403,
      url: '/api/data'
    });
    service.handleError(error);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/error/500']);
  });

  it('should throw "Method not implemented." error when showNetworkError is called', () => {
    expect(() => service['showNetworkError']()).toThrowError('Method not implemented.');
  });  
});
