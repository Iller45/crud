import {Action} from '@ngrx/store';
import * as productAction from '../actions/products';
import {Product} from '../../interfaces/product';

export interface State {
  products: Product[];
}


export const initialState: State = {
  products: [],
};

export function reducer(state = initialState, action: productAction.Action) {
  switch (action.type) {

    case productAction.UPDATE_PRODUCT_LIST: {
      return {
        ...state,
        products: action.payload
      };
    }


    default:
      return state;
  }
}

