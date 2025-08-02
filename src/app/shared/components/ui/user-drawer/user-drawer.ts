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

@Component({
  selector: 'app-user-drawer',
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink, FormsModule, ErrorValidate, InputTextModule, AsyncPipe,
    DrawerModule, AvatarModule, ButtonModule
  ],
  templateUrl: './user-drawer.html',
  styleUrl: './user-drawer.scss'
})
export class UserDrawer implements OnInit, OnDestroy {
  @Input() titleMenu: string = 'User';
  @Input() hiddensmallIcon: boolean = false;
  visibleUser: boolean = false;
  isLogin: boolean = false;
  private route = inject(Router);
  username$: Observable<string | null>;
  role: string | null = '';
  avatar: string | null = '';

  formLogin!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  authService = inject(AuthService);
  subscript: Subscription | undefined;

  constructor() {
    this.username$ = this.authService.getUserName();
    this.avatar = this.authService.getAvatar();
  }
  
  ngOnInit(): void {
    this.createPlatform();
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLogin = status;
    });
  }
  ngOnDestroy(): void {
    if (this.subscript) {
      this.subscript.unsubscribe()
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
    })
    this.formLogin.valueChanges.subscribe(formValue => {

    })
  }

  get password() {
    return this.formLogin.get('password')
  }
  get email() {
    return this.formLogin.get('email')
  }

  onSubmitForm() {
    const { email, passWord } = this.formLogin.value;
    this.subscript = this.userService.checkHaveUser(passWord, email).subscribe(isExist => {
      if (!isExist) {
        console.log('chua dang ky');
      } else {
        console.log('co user', isExist);
        const avatar = isExist.avatar || 'assets/default-avatar.png';
        this.authService.setCurrentUser(isExist.fullName, avatar);

        this.authService.login();
        this.username$ = this.authService.getUserName();
        this.route.navigateByUrl('/main/home');
      }
    });   
  };
  isLogOut(): void {
    this.authService.logOut();
    this.route.navigate(['/main/home'])
  };
  // onResetForm() {
  //   this.formLogin.reset();
  // }

  goRegister(): void {
    this.route.navigateByUrl('/main/auth/register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  goResetPass(): void {
    this.route.navigateByUrl('/main/auth/forgot-password');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  userAva = {
    root: {
      width: '20px',
      height: '20px'
    }
  }
}
