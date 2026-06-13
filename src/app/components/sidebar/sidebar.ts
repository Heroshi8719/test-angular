import { Component, input, output } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
elencoCategorie=input.required<{id: string; etichetta: string}[]>();
idSelezionato=input.required<string>();
categoriaCambiata=output<string>();

}
