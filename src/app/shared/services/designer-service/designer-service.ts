import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  private presetData: any = null;

  constructor() {};

  preset(): any {
    return this.presetData;
  };

  setPreset(data: any): void {
    this.presetData = data;
  };

}
