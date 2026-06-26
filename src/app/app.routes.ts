import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu';
import { ProductDetailComponent } from './components/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: MenuComponent }, // Homepage del Kiosk: mostra il menu
  { path: 'prodotto/:id', component: ProductDetailComponent }, // Pagina di dettaglio dinamica
  { path: '**', redirectTo: '' } // Fallback: se l'URL è sbagliato, torna al menu
];
