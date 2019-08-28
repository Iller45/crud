import {Component, OnInit} from '@angular/core';
import {Product} from './interfaces/product';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from './store/reducers';
import * as productAction from './store/actions/products';
import {productsMock} from './mocks/products.mock';
import {LoadProducts} from './store/actions/products';
import {getAllProducts} from './store/reducers';

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css']
})
export class AppComponent implements OnInit {
  products$: Observable<Product[]>;
  addNewProduct = false;

  constructor(private store: Store<fromRoot.State>) {
    this.products$ = store.select(fromRoot.getAllProducts);
    localStorage.setItem('products', JSON.stringify(productsMock));
  }



  ngOnInit(): void {
    this.store.dispatch(new LoadProducts());
  }
}
