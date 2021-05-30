import * as Actions from "./actions";
import { initialState } from "../store/initialState";

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.FETCH_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.SIGN_OUT:
      return {
        ...initialState.users
      };
    case Actions.SET_USER_ACTION:
      return {
        ...state,
        user: { ...action.payload },
      };
    case Actions.DELETE_USER_ACTION:
      return {
        ...state,
        user: { ...action.payload },
      };
    default:
      return state;
  }
};
