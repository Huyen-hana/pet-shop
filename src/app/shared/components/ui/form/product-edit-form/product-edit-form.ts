import { Component, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RadioGroup } from '../radio-group/radio-group';
import { Product, ProductType } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product-service/product-service';
import { customMessageService } from '../../../../services/message-service/message-service';

@Component({
  selector: 'app-product-edit-form',
  imports: [ButtonModule, InputTextModule, InputNumberModule, CommonModule, FormsModule, ReactiveFormsModule, RadioGroup],
  templateUrl: './product-edit-form.html',
  styleUrl: './product-edit-form.scss'
})
export class ProductEditForm {
  editForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private messService = inject(customMessageService);

  config = inject(DynamicDialogConfig);
  ref = inject(DynamicDialogRef);
  product!: Product;

  isEditMode = false;

  private productService = inject(ProductService);

  categories: any[] = [
    { name: 'Thức ăn cho mèo',
      key: 'A' },
    { name: 'Thức ăn cho chó',
      key: 'B' },
    { name: 'Vận chuyển',
      key: 'C' },
    { name: 'Chăm sóc vệ sinh',
      key: 'D' },
    { name: 'Phụ kiện - Đồ chơi',
      key: 'E' },
    { name: 'Vệ sinh',
      key: 'F' },
  ];
  typeCate: any[] = [
    { name: 'cat',
      key: 'cat' },
    { name: 'dog',
      key: 'dog' },
  ];

  constructor() {
    if (this.config.data) {
      this.product = 
        { ... this.config.data };
        this.isEditMode = true;
    }
  };

  ngOnInit(): void {
    this.createPlatform();
  };

  close() {
    this.ref.close();
  };

  createPlatform() {
    const selectedCategory = this.categories.find(c => c.name === this.product.category) || null;
    const selectedType = this.typeCate.find(t => t.name === this.product.type) || null;

    this.editForm = this.formBuilder.group({
      name: [this.product.name, [
        Validators.required
      ]],
      img: [this.product.img, [  ]],
      brand: [this.product.brand, []],
      type: [selectedType, [
        Validators.required
      ]],
      category: [selectedCategory, [
        Validators.required
      ]],
      price: [this.product.price, [
        Validators.required
      ]],
      currentStock: [this.product.currentStock, [
        Validators.required
      ]],
  })
  };
  get name() {
    return this.editForm.get('name')
  };

  get categoryControl() {
    return this.editForm.get('category');
  };  

  onSubmitForm(event: Event) {
    const rawData = this.editForm.value;
    const updatedFields = this.transFormProduct(rawData);
    
    if (this.isEditMode && this.product.id !== undefined) {
      const updatedProduct = {
        ...this.product,
        ...updatedFields
      };  
    
      this.productService.updateProduct(+this.product.id, updatedProduct).subscribe({
        next: res => {
          this.ref.close(res);
          // console.log('edit')
          this.messService.showSuccess('Success', 'Product information updated successfully')
        },
        error: e => {
          this.messService.showError('Unable to update product', e.message);
        }
      })
      } else {
        this.productService.createProduct(updatedFields).subscribe({
          next: (res) => {
            this.ref.close(res);
            this.messService.showSuccess('Success', 'The product has been newly created')
          },
          error: e => {
            this.messService.showError('Unable to create product', e.message);
          }
        });
      };
  };
  
  private transFormProduct(data: {
    name: string;
    price: number;
    currentStock: number;
    img: string;
    category: { name: string; key: string } | string;
    type: { name: string; key: string } | string;
    brand: string
  }) {
    return {
      name: data.name,
      price: data.price,
      currentStock: data.currentStock,
      img: data.img,
      category: typeof data.category === 'string' ? data.category : data.category?.name || '',
      type: (typeof data.type === 'string' ? data.type : data.type.name) as ProductType,
      brand: data.brand,
      variants: []
    };  
  };
}
