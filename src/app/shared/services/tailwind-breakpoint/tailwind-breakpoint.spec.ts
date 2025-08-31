import { TestBed } from '@angular/core/testing';

import { TailwindBreakpoint } from './tailwind-breakpoint';

describe('TailwindBreakpoint', () => {
  let service: TailwindBreakpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TailwindBreakpoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
