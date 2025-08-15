import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandler {
  private router = inject(Router);

  handleError(error: any) {
    console.error('Error occurred: ', error);
    if(error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 404: 
          this.router.navigate(['/error/404'])
          break;
        case 500: 
          this.router.navigate(['/error/500'])
          break;
        case 0: 
          this.showNetworkError()
          this.router.navigate(['/error/no-connection'])
          break;
        default: 
          this.router.navigate(['/error/500'])
      }
    }
  };
  private showNetworkError() {
    throw new Error('Method not implemented.');
  };
}
