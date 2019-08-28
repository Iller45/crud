import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {productsMock} from './mocks/products.mock';


@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const products = JSON.parse(localStorage.getItem('products'));
    if (req.url === '/api/products' && req.method === 'GET') {
      return of(new HttpResponse({status: 200, body: products}));
    } else if (req.url === '/api/products' && req.method === 'POST') {
      const newProduct = req.body.payload;
      newProduct.id    = products.length + 1;
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
      return of(new HttpResponse({status: 200, body: products}));
    } else if (req.method === 'DELETE') {
      const deletedId      = Number(req.url.split(/\//g).pop());
      const newProductList = products.filter((it) => {
        if (it.id !== deletedId) {
          return it;
        }
      });
      localStorage.setItem('products', JSON.stringify(newProductList));
      return of(new HttpResponse({status: 200, body: newProductList}));
    } else if (req.url === '/api/products' && req.method === 'PUT') {
      const updatedProduct = req.body.payload;
      const newProductList = products.map((it) => {
        if (it.id === updatedProduct.id) {
          return updatedProduct;
        } else{
          return it;
        }
      });
      localStorage.setItem('products', JSON.stringify(newProductList));
      return of(new HttpResponse({status: 200, body: newProductList}));
    } else {
      return next.handle(req);
    }
  }
}
