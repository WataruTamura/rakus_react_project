import { db } from '../../firebase/index';
import { fetchProductsAction } from './actions';
//import { initialState } from '../store/initialState';

const productsRef = db.collection('pruducts');

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef.get().then((snapshots) => {
      const productList = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};


// const uid = initialState.users.uid




// export const fetchCart = () => {
  
//     return async (dispatch) => {
//       if(uid){
//         db.collection(`users/${uid}/order`).get().then((snapshots) => {
//           const cartList = [];
//           snapshots.forEach((snapshot) => {
//             const cartItem = snapshot.data();
//             cartList.push(cartItem);
//           });
//           dispatch(fetchProductsAction(cartList));
//         });
//       }
      
//     };
// };




// export const orderProducts = (productsInCart) => {
//   return async(dispatch, getState) => {
//     const uid = getState().users.uid;
//     const userRef = db.collection('users').doc(uid);
//     const timestamp = FirebaseTimeStamp.now();

//   }
// }

