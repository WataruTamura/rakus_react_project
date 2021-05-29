import { createSelector } from 'reselect';

// firebaseから取得した商品全件
const productsSelector = (state) => state.products;

export const getProducts = createSelector([productsSelector], (state) => {
  console.log(state);
  return state.list;
});

// const cartSelector = (state) => state.users.cart;

// export const getcart = createSelector(
//   [cartSelector],
//   state => state.list
// );
