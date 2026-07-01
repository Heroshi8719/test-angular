import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- 1. AGGIUNTO PER IL TASTO DEL CARRELLO
import { CatalogoService } from '../../services/catalogo';
import { CartService } from '../../services/cart';
import { ProductCardComponent } from '../product-card/product-card';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-menu',
  standalone: true,
  // 3. AGGIUNTO RouterLink NEGLI IMPORTS DEL COMPONENTE
  imports: [ProductCardComponent, SidebarComponent, RouterLink], 
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent implements OnInit {
  catalogoService = inject(CatalogoService);
  protected cartService = inject(CartService); // <-- 4. INIETTATO IL CARRELLO (protected così lo legge l'HTML)

  // Dati delle categorie centralizzati nel componente principale
  listaCategorie = [
    { id: 'tutti', etichetta: '🍔 Tutti' },
    { id: 'Colazione', etichetta: '🥐 Colazione' },
    { id: 'Caffetteria', etichetta: '☕ Caffetteria' },
    { id: 'Bevande', etichetta: '🥤 Bevande' },
    { id: 'oneclick', etichetta: '✨ Offerte OneClick' }
  ];

  categoriaCorrente = signal<string>('tutti');

  // Il motore di calcolo reattivo (Computed) filtra il listino in tempo reale
  prodottiFiltrati = computed(() => {
    const prodotti = this.catalogoService.listino();
    const filtro = this.categoriaCorrente();

    if (filtro === 'tutti') return prodotti;
    if (filtro === 'oneclick') return prodotti.filter(p => p.datiBruti.tipo === 'oneclick');
    
    return prodotti.filter(p => p.datiBruti.categoria?.toLowerCase() === filtro.toLowerCase());
  });

  ngOnInit() {
    this.catalogoService.caricaDati();
  }

  aggiornaFiltro(idNuovaCategoria: string) {
    this.categoriaCorrente.set(idNuovaCategoria);
  }
}