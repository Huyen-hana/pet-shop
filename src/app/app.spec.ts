import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MainLayout } from './features/main/main-layout/main-layout';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { Subject } from 'rxjs';

describe('App', () => {

  let component: App;
  let fixture: ComponentFixture<App>;
  let router: Router;
  let scrollSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MainLayout],
      providers: [
        MessageService,
        DialogService,
        ConfirmationService,
        provideRouter([
          { path: 'main/home', component: MainLayout },
          { path: '', redirectTo: 'main/home', pathMatch: 'full' }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    scrollSpy = spyOn(window, 'scrollTo');
    fixture.detectChanges();
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

  it('should scroll to top on NavigationEnd', () => {
    const navEnd = new NavigationEnd(1, '/main/home', '/main/home');
    (router.events as Subject<any>).next(navEnd);
    expect(scrollSpy).toHaveBeenCalled();
  });

  it('should not scroll if event is not NavigationEnd', () => {
    (router.events as Subject<any>).next({ type: 'OtherEvent' });
    expect(scrollSpy).not.toHaveBeenCalled();
  });

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

  it('should unsubscribe after destroy', () => {
    component.ngOnDestroy();
    (router.events as Subject<any>).next(new NavigationEnd(1, '', ''));
    expect(scrollSpy).not.toHaveBeenCalled();
  });
  
});
