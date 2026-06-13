import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CatalogoService } from '../../services/catalogo';
import { ProductCardComponent } from '../product-card/product-card';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ProductCardComponent, SidebarComponent],
  templateUrl: './menu.html', // <-- Punta al file HTML esterno
  styleUrl: './menu.css'      // <-- Punta al file CSS esterno (crealo vuoto)
})
export class MenuComponent implements OnInit {
  catalogoService = inject(CatalogoService);

listaCategorie = [
{id: 'tutti', etichetta: 'tutti'},
{id: 'Colazione', etichetta: 'Colazione'},
{id: 'Caffetteria', etichetta: 'Caffetteria'},
{id: 'Bevande', etichetta: 'Bevande'},
{id: 'oneclick', etichetta: 'Offerte OneClick'}
];

categoriaCorrente=signal<string>('tutti');

prodottiFiltrati = computed(() => {
const prodotti = this.catalogoService.listino();
const filtro = this.categoriaCorrente();

if(filtro === 'tutti') return prodotti;
if(filtro === 'oneclick') return prodotti.filter(p => p.datiBruti.tipo === 'oneClick');
return prodotti.filter(p => p.datiBruti.categoria?.toLowerCase() === filtro.toLowerCase());
});

  ngOnInit() {
    this.catalogoService.caricaDati();
  }

  aggiornaFiltro(idNuovaCategoria: string){
    this.categoriaCorrente.set(idNuovaCategoria);
  }
}
