import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Loading } from '../../../services/loading/loading';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading-overlay',
  imports: [ProgressSpinnerModule, AsyncPipe],
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.scss'
})
export class LoadingOverlay {
  loadingService = inject(Loading);
  isLoading$ = this.loadingService.isLoading$;
  fillColor : string = '#fafaf9';

  myAmberLoading = {
    root: {
      colorOne: '#f59e0b',
      colorTwo: '#f59e0b',
      colorThree: '#d97706',
      colorFour: '#d97706'
    }
  };
}
