import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';               // <-- HOMEPAGE
import { MenuComponent } from './components/menu/menu';               // <-- MENU CATEGORIE
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { CartComponent } from './components/cart/cart';
import { PaymentComponent } from './components/payment/payment';
import { ThankYouComponent } from './components/thank-you/thank-you';

export const routes: Routes = [
  { path: '', component: HomeComponent },               // La Homepage promozionale è la pagina principale
  { path: 'menu', component: MenuComponent },           // Il catalogo prodotti con le categorie
  { path: 'prodotto/:id', component: ProductDetailComponent },
  { path: 'carrello', component: CartComponent },
  { path: 'pagamento', component: PaymentComponent },
  { path: 'grazie', component: ThankYouComponent },
  { path: '**', redirectTo: '' }                       // I link errati tornano alla Home
];