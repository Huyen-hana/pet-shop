import { TestBed } from '@angular/core/testing';

import { TailwindBreakpoint } from './tailwind-breakpoint';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { of } from 'rxjs';

describe('TailwindBreakpoint', () => {
  let service: TailwindBreakpoint;
  let breakpointObserverSpy: jasmine.SpyObj<BreakpointObserver>;
  let mockBreakpoint = {};

  beforeEach(() => {
    breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);

    TestBed.configureTestingModule({
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverSpy }
      ]
    });

    breakpointObserverSpy.observe.and.returnValue(of({ matches: true } as BreakpointState));
    service = TestBed.inject(TailwindBreakpoint);
    mockBreakpoint = {
      sm: '(min-width: 640px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 1024px)',
      xl: '(min-width: 1280px)'
    };
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true when breakpoint matches', (done) => {
    service.isDesktop$.subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });
  it('should emit false when breakpoint does not match', (done) => {
    breakpointObserverSpy.observe.and.returnValue(of({ matches: false } as BreakpointState));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverSpy }
      ]
    });  
    service = TestBed.inject(TailwindBreakpoint);
    service.isDesktop$.subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should emit true when breakpoint matches', (done) => {
    breakpointObserverSpy.observe.and.returnValue(of({ matches: true } as BreakpointState));

    service.observe('lg').subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });
  it('should emit false when breakpoint does not match', (done) => {
    breakpointObserverSpy.observe.and.returnValue(of({ matches: false } as BreakpointState));

    service.observe('lg').subscribe(value => {
      expect(value).toBeFalse();
      done();
    });
  });
});
