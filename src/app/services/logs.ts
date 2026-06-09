import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private STORAGE_KEY = 'kiosk_system_logs';

  constructor() {
    // All'avvio, puliamo i log vecchi se superano le 1000 righe per non intasare la memoria
    this.ottimizzaSpazio();
  }

  log(message: string, type: 'INFO' | 'SUCCESS' | 'ERROR' = 'INFO') {
    const ora = new Date().toLocaleString(); // Data e ora completa
    const rigaLog = `[${ora}] [${type}] ${message}`;

    // 1. Stampa comunque nella console F12 per gli sviluppatori
    if (type === 'ERROR') console.error(rigaLog);
    else console.log(rigaLog);

    // 2. Salva nel file locale del browser (LocalStorage)
    const logAttuali = this.getLogAttuali();
    logAttuali.push(rigaLog);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logAttuali));
   
  }

  private getLogAttuali(): string[] {
    const dati = localStorage.getItem(this.STORAGE_KEY);
    return dati ? JSON.parse(dati) : [];
  }

  /**
   * Questa è la funzione che userà il tecnico per scaricare il file fisico .txt
   */
  scaricaFileLog() {
    const logArray = this.getLogAttuali();
    const testoUnito = logArray.join('\n');
    
    // Creiamo un file virtuale "Blob" di tipo testo
    const blob = new Blob([testoUnito], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Generiamo un link invisibile e simuliamo il click per scaricare il file
    const link = document.createElement('a');
    link.href = url;
    link.download = `kiosk_logs_${new Date().toISOString().slice(0,10)}.txt`;
    link.click();
    
    // Pulizia memoria
    URL.revokeObjectURL(url);
  }

  svuotaLog() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.log('File di log resettato dal tecnico.', 'INFO');
  }

  private ottimizzaSpazio() {
    const log = this.getLogAttuali();
    if (log.length > 1000) {
      // Tiene solo gli ultimi 500 log se si esagera
      const logFiltrati = log.slice(-500);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(logFiltrati));
    }
  }
}