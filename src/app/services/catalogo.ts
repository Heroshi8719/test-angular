import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementoMenu, ProdottoJSON, ProdottoSingolo, ProdottoOneClick } from '../models/prodotto.model';
import { LoggerService } from './logs';
@Injectable({ providedIn: 'root' })
export class CatalogoService {
  private http = inject(HttpClient);
  listino = signal<ElementoMenu[]>([]);

  private logger = inject(LoggerService);
  caricaDati() {
    this.http.get<ProdottoJSON[]>('/assets/prodotti.json').subscribe({
      next: (datiArrivati) => {
        const elementiIstanzati = datiArrivati.map(dato => {
          this.logger.log(`Dato caricato: ${dato.nome}`, 'SUCCESS');
    
          if (dato.tipo === 'oneclick') {
            return new ProdottoOneClick(dato);
          } else {
            return new ProdottoSingolo(dato);
          }
        });
        this.listino.set(elementiIstanzati);
        this.logger.scaricaFileLog();
          },
      error: (err) => console.error('Errore caricamento:', err)
    });
  }

  getProdottoById(id: string): ElementoMenu | undefined {
  return this.listino().find(p => p.datiBruti.id === id);
}
}