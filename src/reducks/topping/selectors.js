import { createSelector } from 'reselect';

const toppingSelector = (state) => {
  return state.topping;
};
export const getTopping = createSelector(
  [toppingSelector],
  (state) => state.list
);

export const getSumPrice = createSelector(
  [toppingSelector],
  (state) => state.sum
);

export const getOrdersInfo = createSelector(
  [toppingSelector],
  (state) => state.ordersInfo
);
