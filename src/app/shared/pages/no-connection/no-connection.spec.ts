import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoConnection } from './no-connection';
import { provideHttpClient } from '@angular/common/http';

describe('NoConnection', () => {
  let component: NoConnection;
  let fixture: ComponentFixture<NoConnection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoConnection],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoConnection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
