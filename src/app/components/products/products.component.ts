import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';
import { ValueService } from '../../services/value.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private productsService = inject(ProductsService);
  private valueService = inject(ValueService);

  products = signal<Product[]>([]);
  limit = 10;
  offset = 0;
  status: `loading` | `loaded` | `error` | 'init' = 'init';
  rta = '';

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {  
    this.status = `loading`;
    this.productsService.getAll(
      this.limit,
      this.offset
    ).subscribe( {
      next: (products) => {
        this.products.update((prev) => [...prev, ...products]);
        this.status = `loaded`;
      },
      error: () => {
        setTimeout(() => {
          this.products.update(() => []);
        this.status = `error`;
        } , 3000);
      }
    });
  }

  callPromise(){
    this.valueService.getPromiseValue().then((rta) => {
      this.rta = rta;
    });
  }

}
