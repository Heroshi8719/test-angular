import { Component, OnInit, inject, effect } from '@angular/core';
import { CatalogoService } from '../../services/catalogo';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.html', // <-- Punta al file HTML esterno
  styleUrl: './menu.css'      // <-- Punta al file CSS esterno (crealo vuoto)
})
export class MenuComponent implements OnInit {
  catalogoService = inject(CatalogoService);

  constructor() {
    // Il nostro test reactivo: scatta quando arrivano i dati
    effect(() => {
      const prodotti = this.catalogoService.listino();
      if (prodotti.length > 0) {
        console.log('✅ DATI ARRIVATI NEL COMPONENTE MENU:', prodotti);
      }
    });
  }

  ngOnInit() {
    this.catalogoService.caricaDati();
  }
}
