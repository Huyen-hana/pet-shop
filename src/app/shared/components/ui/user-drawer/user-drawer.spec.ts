import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserDrawer } from './user-drawer';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthService } from '../../../services/auth-service/auth-service';
import { UserService } from '../../../services/user-service/user-service';
import { customMessageService } from '../../../services/message-service/message-service';

describe('UserDrawer', () => {

  let component: UserDrawer;
  let fixture: ComponentFixture<UserDrawer>;
  let navigateSpy: jasmine.Spy;
  let scrollSpy: jasmine.Spy;

  const authSpy = jasmine.createSpyObj<AuthService>('AuthService', [
    'login',
    'logOut',
    'getUserName',
    'getAvatar',
    'getRole',
    'setCurrentUser',
    'loadUserFromLocalStorage'
  ]);
  const userSpy = jasmine.createSpyObj<UserService>('UserService', ['checkHaveUser']);
  const messageSpy = jasmine.createSpyObj<customMessageService>('customMessageService', ['showWarn']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDrawer],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authSpy },
        { provide: UserService, useValue: userSpy },
        { provide: customMessageService, useValue: messageSpy },
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    spyOn(component.formLogin, 'reset');
    navigateSpy = spyOn(component['route'], 'navigateByUrl');
    scrollSpy = spyOn(window as any, 'scrollTo');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmitForm', () => {
    it('should login and navigate to admin dashboard if user is admin', fakeAsync(() => {
      const mockUser = {
        fullName: 'Huyen Nguyen',
        avatar: 'ava.png',
        role: 'admin'
      };
      userSpy.checkHaveUser.and.returnValue(of(mockUser));
      authSpy.setCurrentUser.and.stub();
      authSpy.login.and.stub();
      authSpy.getUserName.and.returnValue(of(mockUser.fullName));
      authSpy.getAvatar.and.returnValue(of(mockUser.avatar));
      const navSpy = spyOn(component['route'], 'navigate');

      component.formLogin.setValue({ email: 'huyen@example.com', passWord: '123456' });
      component.onSubmitForm();
      tick();

      expect(component.isLoading).toBeFalse();
      expect(authSpy.setCurrentUser).toHaveBeenCalledWith(mockUser.fullName, mockUser.avatar, mockUser.role);
      expect(authSpy.login).toHaveBeenCalled();
      expect(navSpy).toHaveBeenCalledWith(['/admin/dashboard']);
    }));

    it('should show warning and not login if user does not exist', fakeAsync(() => {
      userSpy.checkHaveUser.and.returnValue(of(null));
      component.formLogin.setValue({ email: 'wrong@example.com', passWord: 'wrongpass' });
      component.onSubmitForm();
      tick();

      expect(component.isLoading).toBeFalse();
      expect(messageSpy.showWarn).toHaveBeenCalledWith('Cannot log in', 'Unregistered account.');
    }));

    it('should login and reset form if user is not admin', fakeAsync(() => {
      const mockUser = {
        fullName: 'Lan Pham',
        avatar: 'ava.png',
        role: 'customer'
      };
      userSpy.checkHaveUser.and.returnValue(of(mockUser));
      authSpy.setCurrentUser.and.stub();
      authSpy.login.and.stub();
      authSpy.getUserName.and.returnValue(of(mockUser.fullName));
      authSpy.getAvatar.and.returnValue(of('ava.png'));
      const navSpy = spyOn(component['route'], 'navigate');

      component.formLogin.setValue({ email: 'lan@example.com', passWord: 'abc123' });
      component.onSubmitForm();
      tick();

      expect(component.isLoading).toBeFalse();
      expect(authSpy.setCurrentUser).toHaveBeenCalledWith(mockUser.fullName, 'ava.png', mockUser.role);
      expect(authSpy.login).toHaveBeenCalled();
      expect(component.formLogin.reset).toHaveBeenCalled();
      expect(navSpy).not.toHaveBeenCalled();
    }));
  });

  describe('isLogOut', () => {
    it('should log out, reset form, and navigate to home', () => {
      authSpy.logOut.and.stub();
      const navSpy = spyOn(component['route'], 'navigate');
      component.isLogOut();

      expect(authSpy.logOut).toHaveBeenCalled();
      expect(component.formLogin.reset).toHaveBeenCalled();
      expect(navSpy).toHaveBeenCalledWith(['/main/home']);
    });
  });

  describe('handleRouter', () => {
    it('should navigate to forgot-password when label is "Quên mật khẩu"', () => {
      component.handleRouter('Quên mật khẩu');
      expect(component.visibleUser).toBeFalse();
      expect(component.formLogin.reset).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith('/main/auth/forgot-password');
      expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should navigate to register when label is "Đăng Ký"', () => {
      component.handleRouter('Đăng Ký');
      expect(component.visibleUser).toBeFalse();
      expect(component.formLogin.reset).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith('/main/auth/register');
      expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should navigate to home for unknown label', () => {
      component.handleRouter('any label');
      expect(component.visibleUser).toBeFalse();
      expect(component.formLogin.reset).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith('/main/home');
      expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });
  
});
