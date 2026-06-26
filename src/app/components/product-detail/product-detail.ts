import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogoService } from '../../services/catalogo';
import { LoggerService } from '../../services/logs';
import { ElementoMenu } from '../../models/prodotto.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  // Iniezioni necessarie per il funzionamento
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private catalogoService = inject(CatalogoService);
  private logger = inject(LoggerService);

  // Signal locale che conterrà il prodotto da mostrare sullo schermo
  prodotto = signal<ElementoMenu | undefined>(undefined);

  ngOnInit() {
    
    // 1. Catturiamo l'id presente nell'URL (es: /prodotto/c1)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // 2. Chiediamo al servizio il prodotto corrispondente
      const trovato = this.catalogoService.getProdottoById(id);
      this.prodotto.set(trovato);

      // 3. Logghiamo l'operazione nel sistema di log locale protetto
      if (trovato) {
        this.logger.log(`Navigazione su dettaglio prodotto: ${trovato.datiBruti.nome} (ID: ${id})`, 'INFO');
      } else {
        this.logger.log(`Tentativo di accesso a ID prodotto inesistente: ${id}`, 'ERROR');
        this.router.navigate(['/']); // Se il prodotto non esiste, rispedisci il Kiosk al menu
      }
    }
      
  }

  aggiungiAlCarrello() {
    
    const p = this.prodotto();
    if (p) {
      // Per ora simuliamo l'aggiunta stampando nel nostro file di log locale
      this.logger.log(`Prodotto aggiunto al carrello con successo: ${p.datiBruti.nome} - Prezzo: ${p.prezzo}€`, 'SUCCESS');
      
      // Opzionale: dopo aver aggiunto il prodotto, possiamo rimandare l'utente al menu principale
      this.router.navigate(['/']);
    }
      
  }
    
}