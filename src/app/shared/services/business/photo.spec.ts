import { TestBed } from '@angular/core/testing';

import { Photo } from './photo-service';
import { provideHttpClient } from '@angular/common/http';

describe('Photo', () => {
  let service: Photo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(Photo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
