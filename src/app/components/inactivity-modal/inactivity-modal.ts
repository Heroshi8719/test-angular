import { Component, inject } from '@angular/core';
import { KioskTimeoutService } from '../../services/kiosk-timeout';

@Component({
  selector: 'app-inactivity-modal',
  standalone: true,
  imports: [],
  templateUrl: './inactivity-modal.html',
  styleUrl: './inactivity-modal.css'
})
export class InactivityModalComponent {
  protected timeoutService = inject(KioskTimeoutService);
}