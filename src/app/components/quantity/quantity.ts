import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity',
  standalone: true,
  templateUrl: './quantity.html',
  styleUrl: './quantity.css'
})
export class QuantityComponent {
  valore = input.required<number>();
  min = input<number>(1); 
  cambio = output<number>(); 

  incrementa() {
    this.cambio.emit(this.valore() + 1);
  }

  decrementa() {
    if (this.valore() > this.min()) {
      this.cambio.emit(this.valore() - 1);
    }
  }
}