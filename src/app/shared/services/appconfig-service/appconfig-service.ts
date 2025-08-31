import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {
  private transitionDone = false;

  constructor() {}

  transitionComplete(): boolean {
    return this.transitionDone;
  }

  setTransitionComplete(value: boolean): void {
    this.transitionDone = value;
  }
}
