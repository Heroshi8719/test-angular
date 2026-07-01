import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { CartComponent } from './components/cart/cart'; // <-- 1. IMPORTA IL COMPONENTE CARRELLO

export const routes: Routes = [
  { 
    path: '', 
    component: MenuComponent 
  },
  { 
    path: 'prodotto/:id', 
    component: ProductDetailComponent 
  },
  { 
    path: 'carrello', 
    component: CartComponent // <-- 2. AGGIUNGI LA ROTTA PER IL CARRELLO
  },
  { 
    path: '**', 
    redirectTo: '' // Salvagente: se l'URL è sbagliato, torna al menu principale
  }
];
