import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class PaymentComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    // Simulazione transazione fittizia: dopo 5 secondi vai alla pagina di ringraziamento
    setTimeout(() => {
      this.router.navigate(['/grazie']);
    }, 5000);
  }
}