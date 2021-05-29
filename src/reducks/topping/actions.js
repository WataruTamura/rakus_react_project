export const FETCH_TOPPING = 'fetch_topping';
export const FETCH_SUMPRICE = 'fetch_sumprice';

export const fetchToppingAction = (topping) => {
  return {
    type: FETCH_TOPPING,
    payload: topping,
  };
};

export const fetchSumPriceAction = (sumPrice) => {
  return {
    type: FETCH_SUMPRICE,
    payload: sumPrice,
  };
};
