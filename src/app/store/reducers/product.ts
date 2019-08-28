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

    case productAction.ADD_ONE_SUCCESS: {
      return {
        ...state,
        products: action.payload
      };
    }


    case productAction.UPDATE_ONE: {
      const editedProduct: Product = action.payload;
      return {
        ...state,
        products: {...state.products, editedProduct}
      };
    }


    default:
      return state;
  }
}

export const getProducts = (state: State) => state.products;
