export interface ProdottoJSON {
  id: string;
  tipo: 'singolo' | 'oneclick';
  categoria: string;
  nome?: string;
  immagine?: string;
  prezzo: number;
  descrizione?: string; // 1. AGGIUNTO: opzionale, perfetto per la pagina di dettaglio
  prodottiInterni?: string[];
}

export abstract class ElementoMenu {
  constructor(public datiBruti: ProdottoJSON) {}

  abstract getImage(): string;
  abstract getNome(): string;

  // 2. AGGIUNTO: Scorciatoia pulita. Ora puoi scrivere "item.prezzo" ovunque nell'app!
  get prezzo(): number {
    return this.datiBruti.prezzo;
  }
}

export class ProdottoSingolo extends ElementoMenu {
  getImage(): string {
    return this.datiBruti.immagine || 'assets/img/placeholder.jpg';
  }
  getNome(): string {
    return this.datiBruti.nome || 'Prodotto Singolo';
  }
}

export class ProdottoOneClick extends ElementoMenu {
  getImage(): string {
    // 3. MIGLIORATO: Se nel JSON metti una foto per la combo usa quella, altrimenti usa l'icona generica
    return this.datiBruti.immagine || 'assets/img/combo_icon.jpg'; 
  }
  
  getNome(): string {
    // 4. MIGLIORATO: Se nel JSON scrivi "Menu Colazione" usa quello, altrimenti usa il testo generico con il conto dei prodotti
    return this.datiBruti.nome || `Combo speciale (${this.datiBruti.prodottiInterni?.length || 2} Prodotti)`;
  }
}