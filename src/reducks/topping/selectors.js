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

// const sumPriceSelector = (state) => {
//   console.log(state);
//   return state.sumprice;
// };
// export const getSumPrice = createSelector([toppingSelector], (state) => state);
