import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupComponent } from './components/popup/popup';
import { InactivityModalComponent } from './components/inactivity-modal/inactivity-modal'; // <-- IMPORTA MODAL
import { KioskTimeoutService } from './services/kiosk-timeout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupComponent, InactivityModalComponent], // <-- AGGIUNGI A IMPORTS
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private timeoutService = inject(KioskTimeoutService);

  ngOnInit() {
    this.timeoutService.iniziaMonitoraggio();
  }
}