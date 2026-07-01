import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- 1. IMPORTA IL ROUTER OUTLET
import { PopupComponent } from './components/popup/popup';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. SOSTITUISCI MenuComponent con RouterOutlet negli imports
  imports: [RouterOutlet,
    PopupComponent
  ], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-socket');
}