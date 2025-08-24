import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchVisible$ = new BehaviorSubject<boolean>(false);

  get visibility$(): Observable<boolean> {
    return this.searchVisible$.asObservable();
  };

  show(): void {
    this.searchVisible$.next(true);
  };

  hide(): void {
    this.searchVisible$.next(false);
  };

  toggle(): void {
    this.searchVisible$.next(!this.searchVisible$.value);
  };
}
