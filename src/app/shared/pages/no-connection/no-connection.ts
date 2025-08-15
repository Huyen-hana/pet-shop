import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Button } from "primeng/button";

@Component({
  selector: 'app-no-connection',
  imports: [Button],
  templateUrl: './no-connection.html',
  styleUrl: './no-connection.scss'
})
export class NoConnection {
  isLoading: boolean = false;
  errMess: string = '';

  private http = inject(HttpClient);
  retryConnection() {
    this.isLoading = true;
    this.errMess = '';

    this.http.get('https://684edc89f0c9c9848d2957f0.mockapi.io/products/ping').subscribe({
      next: () => {
        this.isLoading = false;
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (err.status === 0) {
          this.errMess = 'Unable to connect to server. Please check network.'
        } else {
          this.errMess = `Error ${err.status}: ${err.message}`
        };
      }
    })
  };

}
