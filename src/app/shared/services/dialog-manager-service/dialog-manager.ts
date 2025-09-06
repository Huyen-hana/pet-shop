import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogManager {
  private ref?: DynamicDialogRef;
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);


  open<T>(component: any, options?: {
    data?: any, header?: string, width?: string
  }) {
    this.ref = this.dialogService.open(component, {
      header: options?.header ?? 'Dialog',
      width: options?.width ?? '50vw',
      modal: true,
      data: options?.data,
      contentStyle: {
        overFlow: 'auto'
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });
    
    return this.ref.onClose;
  };
  close() {
    this.ref?.close();
  };

  // confirmDialog
  async openConfirm(message: string, header = 'Confirm'): Promise<boolean> {
    const result$ = new Subject<boolean>();

    this.confirmationService.confirm({
      header,
      message,
      icon: 'pi pi-exclamation-triangle',
      accept: () => result$.next(true),
      reject: () => result$.next(false),
      key: 'globalConfirm'
    });
    return firstValueFrom(result$)
  };

}
