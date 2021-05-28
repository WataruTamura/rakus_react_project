import { db } from '../../firebase/index';
import { fetchToppingAction } from './actions';

const productsRef = db.collection('topping');

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
