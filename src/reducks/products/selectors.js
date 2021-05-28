import { createSelector } from 'reselect';

const productsSelector = (state) => state.products;

export const getProducts = createSelector(
  [productsSelector],
  (state) => state.list
);


// const cartSelector = (state) => state.cart;

// export const getcart = createSelector(
//   [cartSelector],
//   (state) => state.list
// );

