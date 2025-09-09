import { Component, inject, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { filter, Subject, takeUntil } from 'rxjs';
import { LoadingOverlay } from "./shared/components/ui/loading-overlay/loading-overlay";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ConfirmDialogModule, LoadingOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnDestroy {
  protected title = 'pet-shop';
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
