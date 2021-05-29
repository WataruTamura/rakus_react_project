import { db } from '../../firebase/index';
import { fetchProductsAction ,fetchCartsAction} from './actions';
import {useSelector} from 'react-redux'
//import { initialState } from '../store/initialState';
import { getUserId } from '../../reducks/users/selector';


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

// export const FetchCart = () => {

//   const selector = useSelector((state) => state);
//   let uid = getUserId(selector);

//   return async (dispatch) => {
//     db.collection(`users/${uid}/orders`).
//     get().
//     then((snapshot) => {
//       const ordersList = []
//       snapshot.forEach((snap) => {
//         ordersList.push(snap.data())
//       })
//       dispatch(fetchCartsAction(ordersList))
//     })
//   }
// }




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

