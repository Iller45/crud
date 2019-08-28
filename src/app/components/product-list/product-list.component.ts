import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../interfaces/product';

@Component({
  selector : 'app-product-list',
  template : `
      <div class="list">
          <h2>{{label}}</h2>
          <app-product-item
                  *ngFor="let product of products"
                  [product]="product"
          >
          </app-product-item>
      </div>
  `,
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[];
  @Input() label: string;
  @Output() edit = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
