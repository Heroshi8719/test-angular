import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private STORAGE_KEY = 'kiosk_system_logs';
  
  // 1. Controlliamo se stiamo girando sul browser o sul server Node
  private piattaformaId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.piattaformaId);

  constructor() {
    // Eseguiamo l'ottimizzazione solo se siamo nel browser
    if (this.isBrowser) {
      this.ottimizzaSpazio();
    }
  }

  log(message: string, type: 'INFO' | 'SUCCESS' | 'ERROR' = 'INFO') {
    const ora = new Date().toLocaleString();
    const rigaLog = `[${ora}] [${type}] ${message}`;

    // Stampa sempre in console F12 (funziona sia su server che su browser)
    if (type === 'ERROR') console.error(rigaLog);
    else console.log(rigaLog);

    // 2. PROTEZIONE: Salva nel LocalStorage SOLO se siamo nel browser
    if (this.isBrowser) {
      const logAttuali = this.getLogAttuali();
      logAttuali.push(rigaLog);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logAttuali));
    }
  }

  private getLogAttuali(): string[] {
    // 3. PROTEZIONE: Se siamo sul server, restituisci un array vuoto di sicurezza
    if (!this.isBrowser) return [];

    const dati = localStorage.getItem(this.STORAGE_KEY);
    return dati ? JSON.parse(dati) : [];
  }

  scaricaFileLog() {
    if (!this.isBrowser) return; // Non ha senso scaricare un file dal server

    const logArray = this.getLogAttuali();
    const testoUnito = logArray.join('\n');
    
    const blob = new Blob([testoUnito], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    //link.download = `kiosk_logs_${new Date().toISOString().slice(0,10)}.txt`;
    //link.click();
    
    URL.revokeObjectURL(url);
  }

  svuotaLog() {
    if (this.isBrowser) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.log('File di log resettato dal tecnico.', 'INFO');
    }
  }

  private ottimizzaSpazio() {
    if (!this.isBrowser) return;

    const log = this.getLogAttuali();
    if (log.length > 1000) {
      const logFiltrati = log.slice(-500);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logFiltrati));
    }
  }
}