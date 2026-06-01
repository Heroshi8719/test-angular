import { Component, input, output } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CategoryCardComponent], // <-- Importa la scheda categoria qui!
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  // Riceve la lista delle categorie
  elencoCategorie = input.required<{ id: string; etichetta: string }[]>();
  
  // Riceve l'ID di quella attualmente selezionata
  idSelezionato = input.required<string>();

  // Rilancia l'evento del click verso il componente Menu principale
  categoriaCambiata = output<string>();
}