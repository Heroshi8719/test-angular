import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Prodotto{
  id?: string;
  nome: string;
  prezzo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8090/api/collections/prodotti/records';

  listaProdotti = signal<Prodotto[]>([]);

  caricaProdotti(){
    this.http.get<{ items:Prodotto[] }>(this.apiUrl).subscribe({
      next: (risposta) => {
        this.listaProdotti.set(risposta.items);
      },
      error: (err) => console.error('Errore nel caricamento dei prodotti:', err)
    });
  }

  aggiungiProdotto(nuovoProdotto: Prodotto){
    this.http.post<Prodotto>(this.apiUrl, nuovoProdotto).subscribe({
      next: (prodottoSalvato) => {
        console.log("Prodotto salvato sul db:", prodottoSalvato);
        this.listaProdotti.update(prodotti => [prodottoSalvato, ...prodotti]);
      },
      error: (err) => console.error('Errore nel salvataggio:', err)

    });
  }

}
