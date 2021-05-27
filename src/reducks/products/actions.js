export const FETCH_PRODUCTS = 'fetch_products';
export const fetchProductsAction = (products) => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
};
