import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

import { FormGroup , FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorValidate } from '../form/error-validate/error-validate';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, Subscription } from 'rxjs';

import { UserService } from '../../../services/user-service/user-service';
import { AuthService } from '../../../services/auth-service/auth-service';
import { customMessageService } from '../../../services/message-service/message-service';

@Component({
  selector: 'app-user-drawer',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, ErrorValidate, InputTextModule, AsyncPipe,
    DrawerModule, AvatarModule, ButtonModule,
    RouterLink
],
  templateUrl: './user-drawer.html',
  styleUrl: './user-drawer.scss'
})
export class UserDrawer implements OnInit, OnDestroy {
  @Input() titleMenu: string = 'User';
  @Input() hiddensmallIcon: boolean = false;
  visibleUser: boolean = false;
  isLogin$: Observable<boolean> | undefined;
  private route = inject(Router);
  username$: Observable<string | null>;
  role$: Observable<string | null>;
  avatar$: Observable<string | null>;
  isLoading: boolean = false;

  formLogin!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  public authService = inject(AuthService);
  private customMessageService = inject(customMessageService);
  subscript: Subscription | undefined;

  constructor() {
    this.username$ = this.authService.getUserName();
    this.avatar$ = this.authService.getAvatar();
    this.role$ = this.authService.getRole();
  };
  
  ngOnInit(): void {
    this.createPlatform();
    this.isLogin$ = this.authService.isLoggedIn$;
    this.authService.loadUserFromLocalStorage();
  }
  ngOnDestroy(): void {
    if (this.subscript) {
      this.subscript.unsubscribe();
    }
  }

  createPlatform() {
    this.formLogin = this.formBuilder.group({
      passWord: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
      ]]
    });
    // this.formLogin.valueChanges.subscribe(formValue => {

    // })
  }

  get password() {
    return this.formLogin.get('password')
  };
  get email() {
    return this.formLogin.get('email')
  };

  onSubmitForm() {
    this.isLoading = true;
    const { email, passWord } = this.formLogin.value;
    this.subscript = this.userService.checkHaveUser(passWord, email).subscribe(isExist => {
      if (!isExist) {
        this.customMessageService.showWarn('Cannot log in', 'Unregistered account.');
        this.isLoading = false;
        return;
      } 
        const avatar = isExist.avatar ?? 'assets/default-avatar.png';
        this.authService.setCurrentUser(isExist.fullName, avatar, isExist.role);
        this.authService.login();

        this.username$ = this.authService.getUserName();
        this.avatar$ = this.authService.getAvatar();
        this.isLoading = false;

        if (isExist.role === 'admin') {
          this.route.navigate(['/admin/dashboard'])
        } else {
          this.formLogin.reset();
        }
    });   
  };
  isLogOut(): void {
    this.authService.logOut();
    this.formLogin.reset();
    this.route.navigate(['/main/home']);
  };

  handleRouter(label: string) {
    this.visibleUser = false;
    this.formLogin.reset();

    switch (label) {
      case 'Quên mật khẩu':
        this.route.navigateByUrl('/main/auth/forgot-password');
        break;
      case 'Đăng Ký':
        this.route.navigateByUrl('/main/auth/register');
        break;

      default:
        this.route.navigateByUrl('/main/home');
        break;
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  userAva = {
    root: {
      width: '20px',
      height: '20px'
    }
  };
}
