import { TestBed } from '@angular/core/testing';

import { DialogManager } from './dialog-manager';

describe('DialogManager', () => {
  let service: DialogManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
