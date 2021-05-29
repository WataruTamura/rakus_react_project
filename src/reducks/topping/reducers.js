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
    default:
      return state;
  }
};

// export const SumPriceReducer = (state = initialState.sum, action) => {
//   switch (action.type) {
//     case Actions.FETCH_SUMPRICE:
//       console.log(action.payload);
//       return {
//         ...state,
//         sum: action.payload,
//       };
//     default:
//       return state;
//   }
// };
