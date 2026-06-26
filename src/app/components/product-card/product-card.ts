import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementoMenu } from '../../models/prodotto.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,
    RouterLink
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  item = input.required<ElementoMenu>();

  get isOneClick(): boolean {
    return this.item().datiBruti.tipo === 'oneclick';
  }
}
