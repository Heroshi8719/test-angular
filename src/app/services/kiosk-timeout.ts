import { Injectable, inject, NgZone, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart';

@Injectable({
  providedIn: 'root'
})
export class KioskTimeoutService {
  private router = inject(Router);
  private cartService = inject(CartService);
  private zone = inject(NgZone);

  // CONFIGURAZIONE TEMPI (in secondi)
  readonly SECONDI_INATTIVITA = 10; // Tempo prima di mostrare il popup
  readonly SECONDI_COUNTDOWN = 30;  // Tempo di attesa del popup prima del reset

  // STATI REATTIVI
  mostraPopup = signal<boolean>(false);
  secondiRimanenti = signal<number>(this.SECONDI_COUNTDOWN);

  private timerInattivita: any;
  private intervalCountdown: any;

  iniziaMonitoraggio() {
    const eventiInterazione = ['click', 'mousemove', 'keypress', 'touchstart'];
    
    eventiInterazione.forEach(evento => {
      window.addEventListener(evento, () => this.gestisciInterazioneUtente());
    });

    this.resettaTimerInattivita();
  }

  private gestisciInterazioneUtente() {
    // Se il popup NON è aperto, ogni gesto azzera il timer di inattività
    if (!this.mostraPopup()) {
      this.resettaTimerInattivita();
    }
  }

  resettaTimerInattivita() {
    this.pulisciTuttiITimer();

    // Se l'utente è già in Home, non avviamo il timeout
    if (this.isHomeUrl()) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.timerInattivita = setTimeout(() => {
        this.zone.run(() => {
          this.apriPopupTimeout();
        });
      }, this.SECONDI_INATTIVITA * 1000);
    });
  }

  private apriPopupTimeout() {
    if (this.isHomeUrl()) return;

    this.secondiRimanenti.set(this.SECONDI_COUNTDOWN);
    this.mostraPopup.set(true);

    // Avvia il countdown da 30 a 0 secondi
    this.zone.runOutsideAngular(() => {
      this.intervalCountdown = setInterval(() => {
        this.zone.run(() => {
          const nuovoValore = this.secondiRimanenti() - 1;
          this.secondiRimanenti.set(nuovoValore);

          if (nuovoValore <= 0) {
            this.tornaAllaHome();
          }
        });
      }, 1000);
    });
  }

  // AZIONE 1: Chiude il popup e fa ripartire il timer da zero
  continuaSessione() {
    this.mostraPopup.set(false);
    this.resettaTimerInattivita();
  }

  // AZIONE 2: Svuota carrello, chiude popup e naviga alla Home
  tornaAllaHome() {
    this.pulisciTuttiITimer();
    this.mostraPopup.set(false);
    this.cartService.svuotaCarrello();
    this.router.navigate(['/']);
  }

  private pulisciTuttiITimer() {
    if (this.timerInattivita) clearTimeout(this.timerInattivita);
    if (this.intervalCountdown) clearInterval(this.intervalCountdown);
  }

  private isHomeUrl(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}