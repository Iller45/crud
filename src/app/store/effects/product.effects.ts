import { Injectable } from '@angular/core';

import {Effect, Actions, ofType} from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

// import * as fromRoot from '../../../app/store';
import * as productActions from '../actions/products';
import * as fromServices from '../../services/product.service';
import {Product, ProductAction} from '../../interfaces/product';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: fromServices.ProductService
  ) {}

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.LOAD_PRODUCTS),
    switchMap(() => {
      return this.productService.getProducts().pipe(
          map((products: Product[]) => {
            return new productActions.UpdateProductList(products);
          }),
          catchError(error => {
            return new productActions.LoadProductsFail(error).payload;
          })
        );
    })
  );
  @Effect()
  addProduct$ = this.actions$.pipe(
    ofType(productActions.ADD_ONE),
    switchMap((payload: ProductAction) => {
      return this.productService.addProduct(payload).pipe(
          map((products: Product[]) => {
            return new productActions.UpdateProductList(products);
          }),
          catchError(error => {
            return new productActions.AddOneFail(error).payload;
          })
        );
    })
  );

  @Effect()
  deleteProduct$ = this.actions$.pipe(
    ofType(productActions.DELETE_ONE),
    switchMap((payload: ProductAction) => {
      return this.productService.deleteProduct(payload).pipe(
          map((products: Product[]) => {
            return new productActions.UpdateProductList(products);
          }),
          catchError(error => {
            return new productActions.AddOneFail(error).payload;
          })
        );
    })
  );


  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(productActions.UPDATE_ONE),
    switchMap((payload: ProductAction) => {
      return this.productService.updateProduct(payload).pipe(
        map((products: Product[]) => {
          console.log('updateProduct$', products)
          return new productActions.UpdateProductList(products);
        }),
        catchError(error => {
          return new productActions.AddOneFail(error).payload;
        })
      );
    })
  );


}
