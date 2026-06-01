import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  templateUrl: './category-card.html',
  styleUrl: './category-card.css'
})
export class CategoryCardComponent {
  // Riceve i dati della categoria dal componente padre
  categoria = input.required<{ id: string; etichetta: string }>();
  
  // Riceve lo stato: sa se è lui la categoria attiva nel totem
  isAttiva = input<boolean>(false);

  // Invia un segnale verso l'alto quando l'utente la tocca sul display
  cliccata = output<string>();

  seleziona() {
    this.cliccata.emit(this.categoria().id);
  }
}