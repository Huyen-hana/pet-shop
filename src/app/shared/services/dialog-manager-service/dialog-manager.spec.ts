import { TestBed } from '@angular/core/testing';

import { DialogManager } from './dialog-manager';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';

describe('DialogManager', () => {
  let service: DialogManager;
  let dialogServiceSpy: jasmine.SpyObj<DialogService>;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;
  let mockRef: DynamicDialogRef;

  beforeEach(() => {
    mockRef = {
      onClose: of('closed'),
      close: jasmine.createSpy('close'),
      destroy: jasmine.createSpy('destroy'),
      dragStart: jasmine.createSpy('dragStart'),
      dragEnd: jasmine.createSpy('dragEnd'),
      maximize: jasmine.createSpy('maximize'),
      minimize: jasmine.createSpy('minimize'),
      enableModality: jasmine.createSpy('enableModality'),
      disableModality: jasmine.createSpy('disableModality'),
      focus: jasmine.createSpy('focus'),
      getElement: jasmine.createSpy('getElement'),
      getContentElement: jasmine.createSpy('getContentElement'),
      getHeaderElement: jasmine.createSpy('getHeaderElement'),
      getFooterElement: jasmine.createSpy('getFooterElement'),
      getOverlayElement: jasmine.createSpy('getOverlayElement'),
      getCloseIconElement: jasmine.createSpy('getCloseIconElement'),
      getMaximizeIconElement: jasmine.createSpy('getMaximizeIconElement'),
      getMinimizeIconElement: jasmine.createSpy('getMinimizeIconElement'),
      getTitleElement: jasmine.createSpy('getTitleElement'),
      getTitleTextElement: jasmine.createSpy('getTitleTextElement'),
      getTitleIconElement: jasmine.createSpy('getTitleIconElement')
    } as unknown as DynamicDialogRef;  
    dialogServiceSpy = jasmine.createSpyObj('DialogService', ['open']);
    confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    TestBed.configureTestingModule({
      providers: [
        ConfirmationService,
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: ConfirmationService, useValue: confirmationServiceSpy }
      ]
    });
    service = TestBed.inject(DialogManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog with default options and return onClose observable', () => {
    dialogServiceSpy.open.and.returnValue(mockRef);

    const componentMock = class {};
    const result = service.open(componentMock);

    expect(dialogServiceSpy.open).toHaveBeenCalledWith(componentMock, jasmine.objectContaining({
      header: 'Dialog',
      width: '50vw',
      modal: true,
      contentStyle: { overFlow: 'auto' },
      breakpoints: { '960px': '75vw', '640px': '90vw' }
    }));

    expect(result).toBe(mockRef.onClose);
  });

  it('should resolve true when user accepts confirmation', async () => {
    confirmationServiceSpy.confirm.and.stub();
    const promise = service.openConfirm('Bạn có chắc không?', 'Xác nhận');

    const config = confirmationServiceSpy.confirm.calls.mostRecent().args[0];
    config.accept?.();
  
    const result = await promise;
    expect(result).toBeTrue();
  });
  it('should resolve false when user rejects confirmation', async () => {
    confirmationServiceSpy.confirm.and.stub();
    const promise = service.openConfirm('Bạn có chắc muốn hủy?', 'Hủy thao tác');
  
    const config = confirmationServiceSpy.confirm.calls.mostRecent().args[0];
    expect(config.reject).toBeDefined();
  
    config.reject!();
  
    const result = await promise;
    expect(result).toBeFalse();
  });

  it('should call ref.close() if ref is defined', () => {
    const mockRef = {
      close: jasmine.createSpy('close')
    } as unknown as DynamicDialogRef;
    service['ref'] = mockRef;
    service.close();
  
    expect(mockRef.close).toHaveBeenCalled();
  });
  it('should not throw if ref is undefined', () => {
    service['ref'] = undefined;
    expect(() => service.close()).not.toThrow();
  });
});
