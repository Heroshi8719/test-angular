import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementoMenu } from '../../models/prodotto.model';
@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {

  item = input.required<ElementoMenu>();

  get isOneClick(): boolean {
    return this.item().datiBruti.tipo === "oneClick";
  }
}
