import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementoMenu, ProdottoJSON, ProdottoSingolo, ProdottoOneClick } from '../models/prodotto.model';


@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private http = inject(HttpClient);

  // 2. Il Signal che conterrà l'intero listino del Totem
  listino = signal<ElementoMenu[]>([]);

  // 3. Metodo per pescare i dati dal file JSON
  caricaDati() {
    // Angular sa che se il percorso inizia senza 'http', deve cercare nel progetto locale
    this.http.get<ProdottoJSON[]>('/assets/prodotti.json').subscribe({
      next: (datiArrivati) => {
        const elementiIstanziati = datiArrivati.map(dato => {
          if (dato.tipo === 'oneClick') {
            return new ProdottoOneClick(dato);
          } else {
            return new ProdottoSingolo(dato);
          }
        });
        // Quando il JSON viene letto, lo inseriamo nel Signal
        this.listino.set(elementiIstanziati);
       
      },
      error: (errore) => console.error('Errore nel caricamento del file JSON:', errore)
      
    });
  }
}