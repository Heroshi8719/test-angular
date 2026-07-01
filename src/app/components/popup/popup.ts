import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.html',
  styleUrl: './popup.css'
})
export class PopupComponent {
  protected cartService = inject(CartService);
}
