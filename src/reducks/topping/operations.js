import { db } from '../../firebase/index';
import { push } from 'connected-react-router';
import firebase from 'firebase/app';
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

const ordersRef = db
  .collection('users')
  .doc('51Kio0Dzrkbf2J1txbDTdFL7XCh1')
  .collection('orders');

export const addOrdersInfo = (selectedId, sumPrice, LabelName, toppings) => {
  return async (dispatch) => {
    const data = {
      itenInfo: [
        {
          id: 'fwefew',
          itemId: selectedId,
          itemNum: sumPrice,
          itemSize: LabelName,
          toppings: toppings,
        },
      ],
      status: 0,
    };

    const ref = ordersRef.doc();
    const id = ref.id;
    data.id = id;

    // 注文確定されていなければに変更する
    if (ordersRef.doc('qPJLa0j56aykBQbumOtX')) {
      return ordersRef.doc('qPJLa0j56aykBQbumOtX').update({
        itemInfo: firebase.firestore.FieldValue.arrayUnion(data.itenInfo[0]),
      });
    } else {
      return ordersRef
        .add(data)
        .then(() => {
          dispatch(push('/cartlist'));
        })
        .catch((error) => {
          throw new Error(error);
        });
    }

    // dispatch(addOrdersInfoAction(selectedId, sumPrice, LabelName));
  };
};

// export const size = (value) => {
//   return () => {
//     value;
//   };
// };
