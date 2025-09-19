import { Component, DestroyRef, inject } from '@angular/core';
import { ErrorValidate } from '../../../../../shared/components/ui/form/error-validate/error-validate';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService} from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../shared/services/user-service/user-service';
import { finalize, Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router';
import { customMessageService } from '../../../../../shared/services/message-service/message-service';
import { User } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, ErrorValidate, InputTextModule,
    ButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  providers: [ConfirmationService]
})
export class Register {
  formRegister!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  subscript: Subscription | undefined;
  subscriptNewUser: Subscription | undefined;
  private destroyRef = inject(DestroyRef);
  private messService = inject(customMessageService);
  isLoading: boolean = false;

  ngOnInit(): void {
    this.createPlatform();
    this.formRegister.reset()
  }
  ngOnDestroy(): void {
    if (this.subscript) {
      this.subscript.unsubscribe();
    };
    if (this.subscriptNewUser) {
      this.subscriptNewUser.unsubscribe()
    };
  };

  createPlatform() {
    this.formRegister = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
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
    // this.formRegister.valueChanges.subscribe(formValue => {

    // })
  };
  get username() {
    return this.formRegister.get('username')
  }
  get password() {
    return this.formRegister.get('password')
  }
  get email() {
    return this.formRegister.get('email')
  };
  
  onSubmitForm(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    const { email, username, passWord } = this.formRegister.value;
  
    if (!email || !username || !passWord) {
      this.messService.showWarn('Please fill in all information', '');
      this.isLoading = false;
      return;
    }
  
    this.subscript = this.userService.checkUserByEmail(email).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isExist: boolean) => {
        if (isExist) {
          this.messService.showWarn('Email already exists', 'Please enter another Email.');
          this.isLoading = false;
          return;
        }
  
        const createdAt = new Date().toISOString();
        const newUser: User = {
          email,
          fullName: username,
          passWord,
          createdAt,
          role: 'customer',
          avatar: 'https://avatars.githubusercontent.com/u/95056864',
          phone: ''
        };
  
        this.userService.createUser(newUser).pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.isLoading = false)
        ).subscribe({
          next: (res) => {
            this.messService.showSuccess('Registered successfully', `Welcome ${username}, your account is ready to use.`);
            if (res) {
              this.goHome();
            }
          },
          error: (err) => {
            this.messService.showError('Registration failed', err.error?.message || 'Unknown error');
          }
        });
      },
      error: (err) => {
        this.messService.showError('Error checking email', err.error?.message || 'Cannot check email');
      }
    });
  };
  
  goHome() {
    this.router.navigate(['/main/home']);
    this.formRegister.reset();
  }
}
