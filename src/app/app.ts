import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { filter, Subject, takeUntil } from 'rxjs';
import { LoadingOverlay } from "./shared/components/ui/loading-overlay/loading-overlay";
import { AuthService } from './shared/services/auth-service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, LoadingOverlay],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected title = 'pet-shop';
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private authService = inject(AuthService);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
  };

  ngOnInit(): void {
    this.authService.loadUserFromLocalStorage();
    this.redirectIfAdmin();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
  
  private redirectIfAdmin(): void {
    const userRaw = localStorage.getItem('currentUser');
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (user?.role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }
  };

  myAmberToast = {
    root: {
      width: '300px'
    }
  };
}
