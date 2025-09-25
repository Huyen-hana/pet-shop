import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { Register } from './register';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../../shared/services/user-service/user-service';
import { FormControl, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { customMessageService } from '../../../../../shared/services/message-service/message-service';
import { Router } from '@angular/router';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let messageServiceSpy: jasmine.SpyObj<customMessageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['checkUserByEmail', 'createUser']);
    messageServiceSpy = jasmine.createSpyObj('customMessageService', ['showWarn', 'showSuccess', 'showError']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        MessageService,
        { provide: UserService, useValue: userServiceSpy },
        { provide: customMessageService, useValue: messageServiceSpy },
        { provide: Router, useValue: routerSpy }
 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;

    component.formRegister = new FormGroup({
      email: new FormControl(''),
      username: new FormControl(''),
      passWord: new FormControl('')
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should warn if form is incomplete', () => {
    component.formRegister.setValue({ email: '', username: '', passWord: '' });

    component.onSubmitForm(new Event('submit'));

    expect(messageServiceSpy.showWarn).toHaveBeenCalledWith('Please fill in all information', '');
    expect(component.isLoading).toBeFalse();
  });

  it('should warn if email already exists', fakeAsync(() => {
    component.formRegister.setValue({ email: 'test@example.com', username: 'Test', passWord: '123456' });
    userServiceSpy.checkUserByEmail.and.returnValue(of(true));

    component.onSubmitForm(new Event('submit'));
    tick();

    expect(userServiceSpy.checkUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(messageServiceSpy.showWarn).toHaveBeenCalledWith('Email already exists', 'Please enter another Email.');
    expect(component.isLoading).toBeFalse();
  }));

  it('should create user and show success message', fakeAsync(() => {
    component.formRegister.setValue({ email: 'new@example.com', username: 'NewUser', passWord: 'pass123' });
    userServiceSpy.checkUserByEmail.and.returnValue(of(false));
    userServiceSpy.createUser.and.returnValue(of({
      email: 'new@example.com',
      fullName: 'NewUser',
      passWord: 'pass123',
      createdAt: new Date().toISOString(),
      role: 'customer',
      avatar: 'https://avatars.githubusercontent.com/u/95056864',
      phone: ''    
    }));
    spyOn(component, 'goHome');

    component.onSubmitForm(new Event('submit'));
    tick();

    expect(userServiceSpy.createUser).toHaveBeenCalled();
    expect(messageServiceSpy.showSuccess).toHaveBeenCalledWith(
      'Registered successfully',
      'Welcome NewUser, your account is ready to use.'
    );
    expect(component.goHome).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  }));

  it('should show error if createUser fails', fakeAsync(() => {
    component.formRegister.setValue({ email: 'new@example.com', username: 'NewUser', passWord: 'pass123' });
    userServiceSpy.checkUserByEmail.and.returnValue(of(false));
    userServiceSpy.createUser.and.returnValue(throwError(() => ({ error: { message: 'Server error' } })));

    component.onSubmitForm(new Event('submit'));
    tick();

    expect(messageServiceSpy.showError).toHaveBeenCalledWith('Registration failed', 'Server error');
    expect(component.isLoading).toBeFalse();
  }));

  it('should show error if checkUserByEmail fails', fakeAsync(() => {
    component.formRegister.setValue({ email: 'fail@example.com', username: 'FailUser', passWord: 'fail123' });
    userServiceSpy.checkUserByEmail.and.returnValue(throwError(() => ({ error: { message: 'Check failed' } })));

    component.onSubmitForm(new Event('submit'));
    flush();

    expect(messageServiceSpy.showError).toHaveBeenCalledWith('Error checking email', 'Check failed');
    expect(component.isLoading).toBeFalse();
  }));

  it('should navigate to /main/home and reset the form', () => {
    spyOn(component.formRegister, 'reset');

    component.goHome();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/main/home']);
    expect(component.formRegister.reset).toHaveBeenCalled();
  });

});
