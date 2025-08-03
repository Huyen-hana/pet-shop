import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Ripple],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'pet-shop';
}
