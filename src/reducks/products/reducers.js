import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.fuga:
      return {};
    default:
      return state;
  }
};
