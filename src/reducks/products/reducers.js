import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case Actions.FETCH_PRODUCTS:
      return {
        ...state,
        list: [...action.payload],
      };
    
    default:
      return state;
  }
};

// export const cartReducer = (state = initialState.users.cart, action) => {
//   switch (action.type) {
//     case Actions.FETCH_PRODUCTS:
//       return {
//         list: action.payload,
//       };
    
//     default:
//       return state;
//   }
// };
