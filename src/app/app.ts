import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cart } from './cart/cart';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    Cart
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-socket');
}
