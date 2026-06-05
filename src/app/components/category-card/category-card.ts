import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  templateUrl: './category-card.html',
  styleUrl: './category-card.css',
})
export class CategoryCardComponent {
categoria=input.required<{id:string; etichetta: string}>();

isAttiva=input<boolean>(false);

cliccata = output<string>();

seleziona(){
  this.cliccata.emit(this.categoria().id);
}


}
