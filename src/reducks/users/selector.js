import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getUserId = createSelector([usersSelector], (state) => state.uid);

export const getUserName = createSelector(
  [usersSelector], 
  (state) => state.username ? state.username : 'ゲスト'
  );

export const getOrders = createSelector(
  [usersSelector],
  (state) => state.orders
);

export const getOrderHistory = createSelector(
  [usersSelector],
  (state) => state.orderHistory
)