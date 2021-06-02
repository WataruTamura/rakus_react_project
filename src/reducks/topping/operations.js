import { db } from '../../firebase/index';
import { fetchToppingAction, fetchSumPriceAction } from './actions';
import { isValidRequiredInput } from '../../function/common';
import firebase from 'firebase';

let localCart = [
  {
    itemInfo: [],
    status: 0,
  },
];

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

export const addOrdersInfo = (
  selectedId,
  num,
  LabelName,
  toppings,
  uid,
  carts
) => {
  return async (dispatch) => {
    if (!isValidRequiredInput(LabelName)) {
      alert('サイズを選択してください');
      return false;
    }

    const ordersRef = db.collection('users').doc(uid).collection('orders');

    if (carts.length === 0) {
      const ref = ordersRef.doc();
      const id = ref.id;
      ordersRef.doc(id).set({
        orderId: id,
        itemInfo: [
          {
            id: id,
            itemId: selectedId,
            itemNum: Number(num),
            itemSize: Number(LabelName),
            toppings: toppings,
          },
        ],
        status: 0,
      });
    } else {
      let status0Id = [];
      const ref = ordersRef.doc();
      const id = ref.id;
      ordersRef
        .where('status', '==', 0)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            status0Id.push(doc.data().orderId);
          });
          const status0Ref = ordersRef.doc(status0Id[0]);
          status0Ref.update({
            itemInfo: firebase.firestore.FieldValue.arrayUnion({
              id: id,
              itemId: selectedId,
              itemNum: Number(num),
              itemSize: Number(LabelName),
              toppings: toppings,
            }),
          });
        });
    }
  };
};

export const DeleteOrdersInfo = (uid, itemInfos, orderId) => {
  const itemInfosId = itemInfos.id;
  // コレクションの取得
  const ordersRef = db.collection('users').doc(uid).collection('orders');

  return async (dispatch) => {
    ordersRef
      .where('status', '==', 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const docId = doc.data().orderId;
          let deleteItem = doc
            .data()
            .itemInfo.filter((item) => item.id !== itemInfosId);
          localCart = [
            {
              orderId: orderId,
              itemInfo: deleteItem,
              status: 0,
            },
          ];
          ordersRef.doc(orderId).set(localCart[0]);
          if (doc.data().itemInfo.length === 1) {
            ordersRef.doc(docId).delete();
          }
        });
      });
  };
};
