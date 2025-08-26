import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ErrorValidate } from '../../../../shared/components/ui/form/error-validate/error-validate';
import { RadioGroup } from '../../../../shared/components/ui/form/radio-group/radio-group';
import { Dataview } from '../../../../shared/components/ui/dataview/dataview/dataview';
import { CartService } from '../../../../shared/services/cart-service/cart-service';
import { EmptyCart } from "../../../../shared/components/bussiness/cart/empty-cart/empty-cart";

@Component({
  selector: 'app-confirmation',
  imports: [
    ErrorValidate, RadioGroup, Dataview,
    CommonModule, ReactiveFormsModule,
    InputTextModule, Button, FluidModule,
    EmptyCart
],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss'
})
export class Confirmation implements OnInit {
  orderForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  cartService = inject(CartService);
  shippingPrice = signal<number>(0);

  totalPrice = computed(() => {
    return this.cartService.totalPrice() + this.shippingPrice();
  });

  categories: any[] = [
    { name: 'Express Delivery (HCM) - 1-3 days',
      key: 'A',
      price: 25 },
    { name: 'Same-Day Delivery Inner HCM (<10km from District 1)',
      key: 'B',
      price: 30 },
    { name: 'Express Delivery Southern Provinces - 1-3 days',
      key: 'C',
      price: 30 },
    { name: 'Express Delivery Northern Provinces - 3-5 days',
      key: 'D',
      price: 35 },
    { name: 'Same-Day Delivery Outer HCM (>10km from District 1)',
      key: 'E',
      price: 49 },
  ];
  paymentCategories: any[] = [
    { name: 'COD (Cash on Delivery)',
      key: 'COD',
      desc: ['Cash on Delivery'] },
    { name: 'Bank Transfer',
      key: 'Bank Transfer',
      desc: [
        'Dear Customers, please transfer money according to the information below.',
        'MB Bank Account (Military Bank)',
        'Account number: 268901111',
        'PET SHOP CO., LTD',
        'Content: Buyer Name + Phone Number'
      ] }
  ];

  ngOnInit(): void {
    this.createPlatform();
    this.orderForm.reset();
  };
  createPlatform() {
    this.orderForm = this.formBuilder.group({
      phone: ['', [
        Validators.required,
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
      ]],
      selectedCategory1: ['', Validators.required],
      selectedCategory2: ['', Validators.required]
    })
  };
  get phone() {
    return this.orderForm.get('phone')
  };
  get username() {
    return this.orderForm.get('username')
  };
  get address() {
    return this.orderForm.get('address')
  };
  get email() {
    return this.orderForm.get('email')
  };
  get selectedCategory1() {
    return this.orderForm.get('selectedCategory1')
  };
  get selectedCategory2() {
    return this.orderForm.get('selectedCategory2')
  };
  onPriceChange(price: number) {
    this.shippingPrice.set(price);
  };

  onSubmitForm(event: Event) {
    console.log(this.orderForm.value)
  };
}
