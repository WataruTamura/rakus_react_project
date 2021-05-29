import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
);

export const getProductsInCart = createSelector(
  [usersSelector],
  (state) => state.cart
);

export const getOrders = createSelector(
  [usersSelector],
  (state) => state.orders
);
