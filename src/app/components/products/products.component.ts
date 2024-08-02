import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private productsService = inject(ProductsService);

  products: Product[] = [];

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {  
    this.productsService.getAllSimple().subscribe((data: any) => {
      this.products = data;
    });
  }

}
