import { Injectable, signal, computed, inject } from '@angular/core';
import { ElementoMenu } from '../models/prodotto.model';
import { LoggerService } from './logs';

export interface CartItem {
  prodotto: ElementoMenu;
  quantita: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private logger = inject(LoggerService);

  // Stato globale del carrello e del popup di notifica
  carrello = signal<CartItem[]>([]);
  popupMessaggio = signal<string | null>(null);

  // Conteggio totale reattivo di tutti i pezzi nel carrello
  totalePezzi = computed(() => 
    this.carrello().reduce((acc, item) => acc + item.quantita, 0)
  );

  aggiungi(prodotto: ElementoMenu, quantita: number) {
    this.carrello.update(attuali => {
      const esistente = attuali.find(item => item.prodotto.datiBruti.id === prodotto.datiBruti.id);
      
      if (esistente) {
        esistente.quantita += quantita;
        return [...attuali];
      } else {
        return [...attuali, { prodotto, quantita }];
      }
    });

    this.logger.log(`Aggiunto al carrello: ${prodotto.getNome()} x${quantita}`, 'SUCCESS');
    this.popupMessaggio.set(`Hai aggiunto ${quantita}x "${prodotto.getNome()}" al carrello!`);
  }

  aggiornaQuantita(idProdotto: string, nuovaQuantita: number) {
    if (nuovaQuantita <= 0) {
      this.rimuovi(idProdotto);
      return;
    }

    this.carrello.update(attuali =>
      attuali.map(item => 
        item.prodotto.datiBruti.id === idProdotto ? { ...item, quantita: nuovaQuantita } : item
      )
    );
    this.logger.log(`Quantità modificata per ID ${idProdotto} a ${nuovaQuantita}`, 'INFO');
  }

  rimuovi(idProdotto: string) {
    this.carrello.update(attuali => attuali.filter(item => item.prodotto.datiBruti.id !== idProdotto));
    this.logger.log(`Prodotto ID ${idProdotto} rimosso dal carrello`, 'INFO');
  }

  chiudiPopup() {
    this.popupMessaggio.set(null);
  }
}