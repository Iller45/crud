import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {Product, ProductAction} from '../interfaces/product';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`/api/products`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  addProduct(product: ProductAction): Observable<Product[]> {
    return this.http
      .post<Product[]>(`/api/products`, product)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  deleteProduct(product: ProductAction): Observable<Product[]> {
    return this.http
      .delete<Product[]>(`/api/product/${product.payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

 updateProduct(product: ProductAction): Observable<Product[]> {
    return this.http
      .put<Product[]>(`/api/products`, product)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
