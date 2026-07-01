import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CartItemComponent } from '../cart-item/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartItemComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  protected cartService = inject(CartService);
}