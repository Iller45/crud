import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import * as fromProducts from './product';

export interface State {
  products: fromProducts.State;
}

export const reducers: ActionReducerMap<State> = {
  products: fromProducts.reducer,
};


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];


export const getProductState = createFeatureSelector<fromProducts.State>('products');

// export const getIds = createSelector(
//   // getProductState,
//   // fromProducts.getIds,
// );
//
// export const getProducts = createSelector(
//   getProductState,
//   fromProducts.getProducts,
// );
//
//
export const getAllProducts = createSelector(
  getProductState,
  (state) => {
    return state.products;
  }
);



