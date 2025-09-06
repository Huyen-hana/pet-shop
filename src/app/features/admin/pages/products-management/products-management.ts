import { Component, DestroyRef, inject, signal } from '@angular/core';
import { myTable } from '../../../../shared/components/ui/table/table';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { Button } from "primeng/button";
import { TagModule } from 'primeng/tag';
import { Product } from '../../../../shared/models/product.model';
import { TableModule } from "primeng/table";
import { FormsModule } from '@angular/forms';
import { DialogManager } from '../../../../shared/services/dialog-manager-service/dialog-manager';
import { ProductEditForm } from '../../../../shared/components/ui/form/product-edit-form/product-edit-form';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { customMessageService } from '../../../../shared/services/message-service/message-service';


@Component({
  selector: 'app-products-management',
  imports: [myTable, Button, TagModule, TableModule, FormsModule,],
  templateUrl: './products-management.html',
  styleUrl: './products-management.scss'
})
export class ProductsManagement {
  private productService = inject(ProductService);
  private dialogManager = inject(DialogManager);
  // private messService = inject(customMessageService);

  private readonly destroyRef = inject(DestroyRef);

  readonly products = signal<Product[]>([]);
  
  getColumnWidth(field: string): string {
    switch (field) {
      case 'id': return 'auto';
      case 'name': return 'auto';
      case '': return '5%';
      case 'price': return 'auto';
      case 'category': return 'auto';
      case 'currentStock': return 'auto';
      case 'button': return 'auto';
      default: return 'auto';
    }
  };
  
  cartColumns: { field: string; header: string; sortable?: boolean }[] = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Name', sortable: true },
    { field: '', header: 'Image' },
    { field: 'price', header: 'Price', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'currentStock', header: 'Status', sortable: true },
    { field: 'button', header: 'Actions' },
  ];

  ngOnInit() {
    this.loadProducts();
  };  

  getSevere(stock: number) {
    if (stock > 0) {
      return 'success'
    } else {
      return 'warn'
    };
  };

  editProduct(product: Product) {
    this.dialogManager.open(ProductEditForm, {
      header: 'Edit Product',
      data: product,
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      take(1)
    ).subscribe(result => {
      if (result?.id) {
        this.loadProducts();
      } else {
        // console.log('Close');
      }
    });
  };

  addProduct() {
    const defaultProduct: Product = {
      name: '',
      img: '',
      type: '',
      category: '',
      price: 0,
      currentStock: 0,
      brand: '',
      variants: []
    }
    this.dialogManager.open(ProductEditForm, {
      header: 'Create new product',
      data: defaultProduct
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      take(1)
    ).subscribe(result => {
      if (result) {
        this.loadProducts();
        // console.log('add')
      }
    });
  };

  async deleteProduct(id: number) {
    const confirmed = await
      this.dialogManager.openConfirm('Do you want to delete this product?');
    if (confirmed) {
      console.log('Delete')
      // this.productService.deleteProduct(id).subscribe({
      //   next: (res) => {
      //     this.loadProducts();
      //     this.messService.showSuccess('Success', 'Product deleted successfully')
      //   },
      //   error: (e) => {
      //     console.error('Delete failed', e);
      //     this.messService.showError('Error', 'Delete product failed')
      //   }
      // })
    };
  };

  loadProducts() {
    this.productService.getAll().subscribe(data => {
      this.products.set(data);
    });
  }

}
