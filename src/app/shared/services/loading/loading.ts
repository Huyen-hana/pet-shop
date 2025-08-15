import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Loading {
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _isBtnLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this._isLoading.asObservable();
  public readonly isBtnLoading$ = this. _isBtnLoading.asObservable();

  show() {
    this._isLoading.next(true);
  };
  hide() {
    this._isLoading.next(false);
  };

  showBtnLoading() {
    this._isBtnLoading.next(true);
  };
  hideBtnLoading() {
    this._isBtnLoading.next(false);
  };
}
