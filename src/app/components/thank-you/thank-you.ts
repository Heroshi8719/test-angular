import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [],
  templateUrl: './thank-you.html',
  styleUrl: './thank-you.css'
})
export class ThankYouComponent implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);

  ngOnInit() {
    // 1. Svuota il carrello subito, l'ordine è completato correttamente
    this.cartService.svuotaCarrello();

    // 2. Kiosk Loop back: dopo 5 secondi reindirizza alla home del catalogo
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 5000);
  }
}