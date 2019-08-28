import {Action} from '@ngrx/store';
import {Product} from '../../interfaces/product';
import {Error} from '../../interfaces/common';


export const GET_ALL             = '[Products] Get all';
export const LOAD_PRODUCTS       = '[Products] Load products';
export const UPDATE_PRODUCT_LIST = '[Products] Update product list';
export const LOAD_PRODUCTS_FAIL  = '[Products] Load products fail';
export const ADD_ONE             = '[Products] Add one';
export const ADD_ONE_SUCCESS     = '[Products] Add one success';
export const ADD_ONE_FAIL        = '[Products] Add one fail';
export const UPDATE_ONE          = '[Products] Update one';
export const DELETE_ONE          = '[Products] Delete one';


export class LoadProducts implements Action {
  readonly type = LOAD_PRODUCTS;
}


export class UpdateProductList implements Action {
  readonly type = UPDATE_PRODUCT_LIST;

  constructor(public payload: Product[]) {
  }
}

export class LoadProductsFail implements Action {
  readonly type = LOAD_PRODUCTS_FAIL;

  constructor(public payload: any) {
  }
}


export class AddOne implements Action {
  readonly type = ADD_ONE;

  constructor(public payload: Product) {
  }
}

export class AddOneSuccess implements Action {
  readonly type = ADD_ONE_SUCCESS;

  constructor(public payload: Product[]) {
  }
}

export class AddOneFail implements Action {
  readonly type = ADD_ONE_FAIL;

  constructor(public payload: Product[]) {
  }
}


export class UpdateOne implements Action {
  readonly type = UPDATE_ONE;

  constructor(public payload: Product) {
  }
}

export class DeleteOne implements Action {
  readonly type = DELETE_ONE;

  constructor(public payload: Product) {
  }
}


export type Action = AddOne | AddOneSuccess | AddOneFail | UpdateOne | DeleteOne |
  UpdateProductList | LoadProducts | LoadProductsFail;
