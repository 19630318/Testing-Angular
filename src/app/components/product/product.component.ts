import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() product: Product = {
    id: 'dd',
    title: 'deded',
    price: 0,
    description: '',
    images: [],
    category: { id: 0, name: '' }
  }; 

}
