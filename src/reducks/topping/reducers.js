import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const ToppingReducer = (state = initialState.topping, action) => {
  switch (action.type) {
    case Actions.FETCH_TOPPING:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.FETCH_SUMPRICE:
      return {
        ...state,
        sum: action.payload,
      };
    case Actions.ADD_ORDERSINFO:
      return {
        ...state,
        ordersInfo: action.payload,
      };
    default:
      return state;
  }
};
