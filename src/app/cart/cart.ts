import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Prodotto, ProdottoService } from'../services/prodottoService';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './cart.html'
})

export class Cart implements OnInit {
  prodottoService = inject(ProdottoService);

  nuovoNome: string = '';
  nuovoPrezzo: number = 0;

  ngOnInit(){
    this.prodottoService.caricaProdotti();
  }

  salva(){
    if(this.nuovoNome.trim() !== '' && this.nuovoPrezzo > 0){
      this.prodottoService.aggiungiProdotto({
        nome: this.nuovoNome,
        prezzo: this.nuovoPrezzo
      });
      this.nuovoNome='';
      this.nuovoPrezzo=0;
    }
  }

}
//Analizzare il funzionamento di chrome per i dns (gestione ip) se è paragonabile ai socket o hanno qualcosa in comune.
