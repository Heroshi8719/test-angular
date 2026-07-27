import { Component, OnInit, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';
import { CatalogoService } from '../../services/catalogo';
import { CartItemComponent } from '../cart-item/cart-item';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CartItemComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  protected cartService = inject(CartService);
  private catalogoService = inject(CatalogoService);

  ngOnInit() {
    this.catalogoService.caricaDati();
  }

  // Filtro reattivo e fortemente tipizzato per gli Upsell
  prodottiUpsell = computed(() => {
    const tutti = this.catalogoService.listino();
    const carrello = this.cartService.carrello();

    // Raccoglie gli ID dei prodotti già presente nel carrello
    const idsInCarrello = new Set(carrello.map(item => item.prodotto.datiBruti.id));

    // Esclude i prodotti già a carrello
    return tutti.filter(p => !idsInCarrello.has(p.datiBruti.id));
  });

  aggiungiDaUpsell(prodotto: any) {
    this.cartService.aggiungi(prodotto,1);
  }
}