import * as Actions from './actions';
import { initialState } from '../store/initialState';

export const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SIGN_OUT:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SET_USER_ACTION:
      return {
        ...state,
        user: {...action.payload}
      };
    case Actions.DELETE_USER_ACTION:
      return {
        ...state,
        user: {...action.payload}
      };
    default:
      return state;
  }
};
