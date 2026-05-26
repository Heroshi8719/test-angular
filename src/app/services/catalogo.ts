import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// 1. Definiamo la "forma" dei nostri dati
export interface Prodotto {
  id: string;
  categoria: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  immagine: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private http = inject(HttpClient);

  // 2. Il Signal che conterrà l'intero listino del Totem
  listino = signal<Prodotto[]>([]);

  // 3. Metodo per pescare i dati dal file JSON
  caricaDati() {
    // Angular sa che se il percorso inizia senza 'http', deve cercare nel progetto locale
    this.http.get<Prodotto[]>('/assets/prodotti.json').subscribe({
      next: (datiArrivati) => {
        // Quando il JSON viene letto, lo inseriamo nel Signal
        this.listino.set(datiArrivati);
        console.log('Listino caricato con successo:', this.listino());
      },
      error: (errore) => {
        console.error('Errore nel caricamento del file JSON:', errore);
      }
    });
  }
}