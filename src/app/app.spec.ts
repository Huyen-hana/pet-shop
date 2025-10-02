import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { App } from './app';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MainLayout } from './features/main/main-layout/main-layout';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

describe('App', () => {

  let component: App;
  let fixture: ComponentFixture<App>;
  let routerEvents$: Subject<any>;
  let scrollSpy: jasmine.Spy;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    routerEvents$ = new Subject<any>();
    routerMock = {
      events: routerEvents$,
      navigate: jasmine.createSpy(),
      navigateByUrl: jasmine.createSpy()
    };

    await TestBed.configureTestingModule({
      imports: [App, MainLayout],
      providers: [
        MessageService,
        DialogService,
        ConfirmationService,
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    scrollSpy = spyOn(window, 'scrollTo');
    fixture.detectChanges();
  });  

  afterEach(() => {
    scrollSpy.calls.reset();
    component.ngOnDestroy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect((component as any).title).toBe('pet-shop');
  });

  it('should render layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should scroll to top on NavigationEnd', fakeAsync(() => {
    routerEvents$.next(new NavigationEnd(1, '/main/home', '/main/home'));
    tick();
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  }));

  it('should not scroll if event is not NavigationEnd', fakeAsync(() => {
    routerEvents$.next({ type: 'OtherEvent' });
    tick();
    expect(scrollSpy).not.toHaveBeenCalled();
  }));

  it('should have destroy$ as Subject', () => {
    expect((component as any).destroy$ instanceof Subject).toBeTrue();
  });

  it('should clean up on destroy', () => {
    const completeSpy = spyOn((component as any).destroy$, 'complete');
    const nextSpy = spyOn((component as any).destroy$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should not scroll after destroy', fakeAsync(() => {
    component.ngOnDestroy();
    routerEvents$.next(new NavigationEnd(1, '', ''));
    tick();
    expect(scrollSpy).not.toHaveBeenCalled();
  }));
});
