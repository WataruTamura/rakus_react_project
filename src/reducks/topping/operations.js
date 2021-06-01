import { db } from '../../firebase/index';
import { fetchToppingAction, fetchSumPriceAction } from './actions';

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

export const addOrdersInfo = (selectedId, num, LabelName, toppings, uid) => {
  // コレクションの取得
  const ordersRef = db.collection('users').doc(uid).collection('orders');

  // クリックしたらローカルのカートに情報を保存
  const ref = ordersRef.doc();
  const id = ref.id;
  localCart[0].itemInfo.push({
    id: id,
    itemId: selectedId,
    itemNum: Number(num),
    itemSize: Number(LabelName),
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
          id: id,
          itemId: selectedId,
          itemNum: Number(num),
          itemSize: Number(LabelName),
          toppings: toppings,
        });
        ordersRef.doc(id).set(localCart[0]);
      }
    });
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
  // }, [,itemInfos.id, orderId, uid]);
};
