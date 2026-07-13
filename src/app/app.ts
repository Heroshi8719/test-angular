import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupComponent } from './components/popup/popup';
import { KioskTimeoutService } from './services/kiosk-timeout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PopupComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // 2. INIETTA IL MOTORE DI TIMEOUT
  private timeoutService = inject(KioskTimeoutService); 

  ngOnInit() {
    // 3. ACCENDI IL MONITORAGGIO GLOBALE ALL'AVVIO DEL TOTEM
    this.timeoutService.iniziaMonitoraggio();
  }
}