export const FETCH_PRODUCTS = 'fetch_products';
export const fetchProductsAction = (products) => {
  console.log('fetchProductsAction発火');
  console.log(typeof products);
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
};
