import { db } from '../../firebase/index';
import { fetchToppingAction, fetchSumPriceAction } from './actions';

const productsRef = db.collection('topping').orderBy('id', 'asc');

export const fetchTopping = () => {
  return async (dispatch) => {
    productsRef.get().then((snapshots) => {
      const toppingList = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        toppingList.push(product);
      });
      dispatch(fetchToppingAction(toppingList));
    });
  };
};

export const fetchSumPrice = (sumPrice) => {
  return (dispatch) => {
    dispatch(fetchSumPriceAction(sumPrice));
  };
};

// export const size = (value) => {
//   return () => {
//     value;
//   };
// };
