import { db } from '../../firebase/index';
// import { push } from 'connected-react-router';
// import firebase from 'firebase/app';
import { fetchToppingAction, fetchSumPriceAction } from './actions';

const toppingsRef = db.collection('topping').orderBy('id', 'asc');

export const fetchTopping = () => {
  return async (dispatch) => {
    toppingsRef.get().then((snapshots) => {
      const toppingList = [];
      snapshots.forEach((snapshot) => {
        const topping = snapshot.data();
        toppingList.push(topping);
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

let localCart = [
  {
    itemInfo: [],
    status: 0,
  },
];

export const addOrdersInfo = (
  selectedId,
  sumPrice,
  LabelName,
  toppings,
  uid
) => {
  console.log(uid);
  // コレクションの取得
  const ordersRef = db.collection('users').doc(uid).collection('orders');

  // クリックしたらローカルのカートに情報を保存
  localCart[0].itemInfo.push({
    id: 'ffwafewawefew',
    itemId: selectedId,
    itemNum: sumPrice,
    itemSize: LabelName,
    toppings: toppings,
  });

  return async (dispatch) => {
    ordersRef.get().then((querySnapshot) => {
      // statusの状態とidの確認
      let status = [];
      let status0Id = '';
      querySnapshot.forEach((doc) => {
        if (doc.data().status === 0) {
          status.push('0');
          status0Id = doc.id;
        }
      });
      if (status.length !== 0) {
        // statusに0がある場合
        return ordersRef.doc(status0Id).set(localCart[0]);
      } else {
        // statusに0がない場合、idを取得して保存
        const ref = ordersRef.doc();
        const id = ref.id;
        localCart = [
          {
            orderId: id,
            itemInfo: [],
            status: 0,
          },
        ];
        localCart[0].itemInfo.push({
          // id: 'ffwafewawefew',
          itemId: selectedId,
          itemNum: sumPrice,
          itemSize: LabelName,
          toppings: toppings,
        });
        ordersRef.doc(id).set(localCart[0]);
      }
    });
  };
};
