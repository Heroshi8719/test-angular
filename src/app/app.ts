import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- 1. IMPORTA IL ROUTER OUTLET


@Component({
  selector: 'app-root',
  standalone: true,
  // 2. SOSTITUISCI MenuComponent con RouterOutlet negli imports
  imports: [RouterOutlet], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-socket');
}