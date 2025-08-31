import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class TailwindBreakpoint {
  private pbObserver = inject(BreakpointObserver);
  isDesktop$: Observable<boolean>;
  constructor() {
    this.isDesktop$ = this.pbObserver.observe([this.breakpoints.lg])
      .pipe(
        map(result => 
          result.matches
        ),
        shareReplay(1)
      );
  };

  private readonly breakpoints = {
    sm: '(min-wwidth: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)'
  };

  observe(bp: keyof typeof this.breakpoints): Observable<boolean> {
    return this.pbObserver.observe(this.breakpoints[bp])
      .pipe(
        map(result => result.matches)
      );
  };

}
