import { Injectable, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart';

@Injectable({
  providedIn: 'root'
})
export class KioskTimeoutService {
  private router = inject(Router);
  private cartService = inject(CartService);
  private zone = inject(NgZone);

  private timer: any;
  private readonly TEMPO_LIMITE = 5000; // 5000 millisecondi = 5 secondi

  iniziaMonitoraggio() {
    const eventiInterazione = ['click', 'mousemove', 'keypress', 'touchstart'];
    
    // Agganciamo gli ascoltatori globali alla finestra del browser
    eventiInterazione.forEach(evento => {
      window.addEventListener(evento, () => this.resettaTimer());
    });

    // Fai partire il primo countdown all'avvio del Kiosk
    this.resettaTimer();
  }

  private resettaTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    /* Performance Pro-Tip: Eseguiamo il timer fuori da Angular (runOutsideAngular)
      per evitare che i continui movimenti del mouse o tocchi sullo schermo 
      sovraccarichino la CPU del Totem con inutili calcoli di rendering.
    */
    this.zone.runOutsideAngular(() => {
      this.timer = setTimeout(() => {
        // Rientriamo nel flusso di Angular solo quando il tempo è scaduto davvero
        this.zone.run(() => {
          this.reindirizzaAHome();
        });
      }, this.TEMPO_LIMITE);
    });
  }

  private reindirizzaAHome() {
    // Se l'utente si trova già nella Home, non serve forzare il reindirizzamento
    if (this.router.url !== '/' && this.router.url !== '/home') {
      
      // OPZIONALE MA CONSIGLIATO PER I TOTEM: 
      // Se l'utente abbandona la postazione, svuotiamo il carrello per il cliente successivo
      this.cartService.svuotaCarrello();

      this.router.navigate(['/']);
    }
  }
}