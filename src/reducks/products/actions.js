export const FETCH_PRODUCTS = 'fetch_products';
export const fetchProductsAction = (products) => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
};

// export const FETCH_CARTS = 'fetch_carts';
// export const fetchCartsAction = (cartList) => {
//   return {
//     type: FETCH_PRODUCTS,
//     payload: cartList,
//   };
// };