import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogoService } from '../../services/catalogo';
import { CartService } from '../../services/cart';
import { ElementoMenu } from '../../models/prodotto.model';
import { QuantityComponent } from '../quantity/quantity';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, QuantityComponent],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private catalogoService = inject(CatalogoService);
  private cartService = inject(CartService);

  prodotto = signal<ElementoMenu | undefined>(undefined);
  quantitaSelezionata = signal<number>(1); 

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const trovato = this.catalogoService.getProdottoById(id);
      if (trovato) {
        this.prodotto.set(trovato);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  aggiungiAlCarrello() {
    const p = this.prodotto();
    if (p) {
      this.cartService.aggiungi(p, this.quantitaSelezionata());
      this.router.navigate(['/']);
    }
  }
}