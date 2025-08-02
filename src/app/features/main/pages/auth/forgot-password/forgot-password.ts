import { Component, inject } from '@angular/core';
import { ErrorValidate } from '../../../../../shared/components/ui/form/error-validate/error-validate';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ErrorValidate, 
    ButtonModule, ReactiveFormsModule, FormsModule, InputTextModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  resetPass!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  
  ngOnInit(): void {
    this.createPlatform();
  }

  createPlatform() {
    this.resetPass = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
      ]]
    })
  }
  get email() {
    return this.resetPass.get('email')
  }

  onSubmitForm() {
    
  }
  goHome() {
    this.router.navigateByUrl('/main/home');
    this.resetPass.reset();
  }
  
}
