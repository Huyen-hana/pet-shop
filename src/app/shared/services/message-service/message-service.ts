import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class customMessageService {
  private primeMessageService = inject(MessageService);

  showSuccess(summary: string = '', detail: string = ''): void {
    this.primeMessageService.add({ severity: 'success', summary: summary, detail: detail, life: 3000 });
  };
  showInfo(summary: string = '', detail: string = ''): void {
    this.primeMessageService.add({ severity: 'info', summary: summary, detail: detail, life: 3000 });
  };
  showError(summary: string = '', detail: string = ''): void {
    this.primeMessageService.add({ severity: 'error', summary: summary, detail: detail, life: 3000 });
  };
  showWarn(summary: string = '', detail: string = ''): void {
    this.primeMessageService.add({ severity: 'warn', summary: summary, detail: detail, life: 3000 });
  };

}
