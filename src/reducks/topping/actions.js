export const FETCH_TOPPING = 'fetch_topping';
export const FETCH_SUMPRICE = 'fetch_sumprice';
export const ADD_ORDERSINFO = 'add_ordersInfo';

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

export const addOrdersInfoAction = (selectedId, sumPrice, LabelName) => {
  return {
    type: ADD_ORDERSINFO,
    payload: [selectedId, sumPrice, LabelName],
  };
};
