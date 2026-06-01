export interface ProdottoJSON {
  id: string;
  tipo: 'singolo' | 'oneclick';
  categoria: string;
  nome?: string;
  immagine?: string;
  prezzo: number;
  prodottiInterni?: string[];
}

export abstract class ElementoMenu {
  constructor(public datiBruti: ProdottoJSON) {}

  abstract getImage(): string;
  abstract getNome(): string;
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
    return 'assets/img/combo_icon.jpg'; 
  }
  getNome(): string {
    return `Combo speciale (${this.datiBruti.prodottiInterni?.length || 2} Prodotti)`;
  }
}