import { createSelector } from 'reselect';

const toppingSelector = (state) => state.topping;

export const getTopping = createSelector(
  [toppingSelector],
  (state) => state.list
);
