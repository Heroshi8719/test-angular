import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementoMenu, ProdottoJSON, ProdottoSingolo, ProdottoOneClick } from '../models/prodotto.model';

@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private http = inject(HttpClient);
  listino = signal<ElementoMenu[]>([]);

  caricaDati() {
    this.http.get<ProdottoJSON[]>('/assets/prodotti.json').subscribe({
      next: (datiArrivati) => {
        const elementiIstanzati = datiArrivati.map(dato => {
          if (dato.tipo === 'oneclick') {
            return new ProdottoOneClick(dato);
          } else {
            return new ProdottoSingolo(dato);
          }
        });
        this.listino.set(elementiIstanzati);
      },
      error: (err) => console.error('Errore caricamento:', err)
    });
  }
}