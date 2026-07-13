import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { CartComponent } from './components/cart/cart';
import { PaymentComponent } from './components/payment/payment';     // <-- IMPORTA PAGAMENTO
import { ThankYouComponent } from './components/thank-you/thank-you'; // <-- IMPORTA RINGRAZIAMENTO

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'prodotto/:id', component: ProductDetailComponent },
  { path: 'carrello', component: CartComponent },
  { path: 'pagamento', component: PaymentComponent }, // <-- REGISTRA LA ROTTA
  { path: 'grazie', component: ThankYouComponent },   // <-- REGISTRA LA ROTTA
  { path: '**', redirectTo: '' }
];