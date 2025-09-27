import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerError } from './server-error';
import { provideRouter } from '@angular/router';

describe('ServerError', () => {
  let component: ServerError;
  let fixture: ComponentFixture<ServerError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerError],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
