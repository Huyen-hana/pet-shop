import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-cart',
  imports: [RouterLink, ButtonModule],
  templateUrl: './empty-cart.html',
  styleUrl: './empty-cart.scss'
})
export class EmptyCart {

}
