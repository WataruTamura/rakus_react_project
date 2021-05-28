export const FETCH_TOPPING = 'fetch_topping';
export const fetchToppingAction = (topping) => {
  return {
    type: FETCH_TOPPING,
    payload: topping,
  };
};
