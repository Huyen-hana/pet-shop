import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { customMessageService } from './message-service';

describe('MessageService', () => {
  let service: customMessageService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: spy }
      ]
    });
    service = TestBed.inject(customMessageService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call add with success severity', () => {
    service.showSuccess('Success', 'Operation completed');
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Operation completed',
      life: 3000
    });
  });

  it('should call add with info severity', () => {
    service.showInfo('Info', 'Just letting you know');
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Info',
      detail: 'Just letting you know',
      life: 3000
    });
  });

  it('should call add with error severity', () => {
    service.showError('Error', 'Something went wrong');
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Something went wrong',
      life: 3000
    });
  });

  it('should call add with warn severity', () => {
    service.showWarn('Warning', 'Be careful');
    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Be careful',
      life: 3000
    });
  });

});
