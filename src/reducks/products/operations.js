import { db } from '../../firebase/index';
import { fetchProductsAction } from './actions';

const productsRef = db.collection('pruducts');

export const fetchProducts = () => {
  console.log('fetchProducts発火');
  return async (dispatch) => {
    productsRef.get().then((snapshots) => {
      const productList = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      console.log(Array.isArray(productList));
      dispatch(fetchProductsAction(productList));
    });
  };
};