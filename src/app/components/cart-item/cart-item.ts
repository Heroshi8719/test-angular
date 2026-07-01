import { Component, input, inject } from '@angular/core';
import { CartItem } from '../../services/cart';
import { CartService } from '../../services/cart';
import { QuantityComponent } from '../quantity/quantity';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [QuantityComponent],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css'
})
export class CartItemComponent {
  item = input.required<CartItem>();
  private cartService = inject(CartService);

  aggiorna(nuovaQuantita: number) {
    this.cartService.aggiornaQuantita(this.item().prodotto.datiBruti.id, nuovaQuantita);
  }
}
