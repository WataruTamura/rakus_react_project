/* eslint-disable */ //⇦ESLintの警告を非常時にする
import { db, auth, FirebaseTimestamp } from '../../firebase/index';
import {
  isValidEmailFormat,
  isValidRequiredInput,
  isValidCardFormat,
} from '../../function/common';
import {
  signInAction,
  fetchOrdersAction,
  signUpAction,
  signOutAction,
  fetchCartAction,
} from './actions';
import { createBrowserHistory } from 'history';
import { push } from 'connected-react-router';
import { useEffect } from 'react';

const pattern = /^[0-9]{3}-[0-9]{4}$/;

export const signUp = (
  username,
  email,
  zipcode,
  address,
  tel,
  password,
  confirmPassword
) => {
  const browserHistory = createBrowserHistory();

  return async (dispatch) => {
    // Validations
    if (
      !isValidRequiredInput(
        username,
        email,
        password,
        confirmPassword,
        address,
        zipcode,
        tel
      )
    ) {
      alert('必須項目が未入力です。');
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。');
      return false;
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう1度お試しください。');
      return false;
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。');
      return false;
    }
    if (!pattern.test(zipcode)) {
      alert('郵便番号は XXX-XXXX の形式で入力してください');
      return false;
    }
    if (!tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
      alert('携帯電話11桁の数値を入力してください！');
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            uid: uid,
            updated_at: timestamp,
            password: password,
            username: username,
            zipcode: zipcode,
            address: address,
            tel: tel,
          };

          db.collection(`users/${uid}/userinfo`)
            .doc()
            .set(userInitialData)
            .then(async () => {
              dispatch(push('/'));
              location.reload();
            });
        }
        dispatch(signUpAction(username, email, zipcode, address, tel));
      });
  };
};

const usersRef = db.collection('users');
const signIn = (email, password) => {
  const browserHistory = createBrowserHistory();
  return async (dispatch) => {
    if (!isValidRequiredInput(email, password)) {
      alert('必須項目が未入力です');
      return false;
    }
    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。');
      return false;
    }

    return auth.signInWithEmailAndPassword(email, password).then((result) => {
      const userState = result.user;
      if (!userState) {
        throw new Error('ユーザーIDを取得できません');
      }
      const userId = userState.uid;

      return usersRef
        .doc(userId)
        .collection('userinfo')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (!data) {
              throw new Error('ユーザーデータが存在しません');
            }

            dispatch(
              signInAction({
                email: data.email,
                isSignedIn: true,
                uid: userId,
                username: data.username,
                address: data.address,
                tel: data.tel,
                zipcode: data.zipcode,
              })
            );
          });
          browserHistory.push('/');
          location.reload();
        });
    });
  };
};

export default signIn;

export const signOut = () => {
  return async (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(signOutAction());
      })
      .catch(() => {
        throw new Error('ログアウトに失敗しました。');
      });
    dispatch(push('/login'));
    location.reload();
  };
};

export const fetchOrders = (uid) => {
  const ordersRef = db.collection('users').doc(uid).collection('orders');

  return async (dispatch) => {
    ordersRef.get().then((snapshots) => {
      const orderList = [];
      snapshots.forEach((snapshot) => {
        const order = snapshot.data();
        orderList.push(order);
      });
      dispatch(fetchOrdersAction(orderList));
    });
  };
};

export const setCancel = (orderId, uid) => {
  const ordersRef = db.collection('users').doc(uid).collection('orders');
  const updateOrdersRef = ordersRef.doc(orderId);
  return updateOrdersRef.update({
    status: 9,
  });
};

export const addPaymentInfo = (
  uid,
  destinationUserName,
  destinationEmail,
  destinationZipcode,
  destinationAddress,
  destinationTel,
  destinationDate,
  destinationPreTime,
  creditCardNo,
  sumPrice,
  paymentValue
) => {
  const browserHistory = createBrowserHistory();
  const date1 = new Date();
  const nowDate = date1.getDate();
  const nowHour = date1.getHours();
  const orderDate = Number(destinationDate.split('-').splice(2, 3).join(''));

  return async (dispatch) => {
    // Validations
    if (
      !isValidRequiredInput(
        destinationUserName,
        destinationEmail,
        destinationZipcode,
        destinationAddress,
        destinationTel,
        destinationDate,
        destinationPreTime,
        paymentValue
      )
    ) {
      alert('必須項目が未入力です。');
      return false;
    }

    if (!pattern.test(destinationZipcode)) {
      alert('郵便番号は XXX-XXXX の形式で入力してください');
      return false;
    }
    if (!isValidEmailFormat(destinationEmail)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。');
      return false;
    }
    if (destinationTel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
      alert('電話番号は XXXX-XXXX-XXXX の形式で入力してください');
      return false;
    }
    if (orderDate - nowDate < 0) {
      alert('今日以降の日付を選択してください');
      return false;
    }
    if (destinationPreTime === 0) {
      alert('配達時間を選択してください');
      return false;
    }
    if (orderDate - nowDate === 0 && destinationPreTime - nowHour <= 3) {
      alert('3時間後以降の時間を選択してください');
      return false;
    }
    if (paymentValue <= 0) {
      alert('支払い方法を選択してください');
      return false;
    }

    if (paymentValue === 2 && creditCardNo === 0) {
      alert('クレジットカードの番号を記入してください');
      return false;
    }

    if (paymentValue === 2 && !isValidCardFormat(creditCardNo)) {
      alert('クレジットカードの形式が不正です。');
      return false;
    }

    const ordersRef = db.collection('users').doc(uid).collection('orders');
    const timestamp = FirebaseTimestamp.now().toDate();

    ordersRef
      .where('status', '==', 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const orderedId = doc.data().orderId;
          ordersRef.doc(orderedId).update({
            status: paymentValue,
            userId: uid,
            orderDate: timestamp,
            destinationName: destinationUserName,
            destionationZipcode: destinationZipcode,
            destinationAddress: destinationAddress,
            destinationTel: destinationTel,
            destionationTime: destinationDate,
            paymentMethod: paymentValue,
            creditCard: creditCardNo,
            totalPrice: sumPrice,
          });
        });
      });
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .collection('userinfo')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();

              if (!data) {
                throw new Error('ユーザーデータが存在しません');
              }
              dispatch(
                signInAction({
                  email: data.email,
                  isSignedIn: true,
                  uid: user.uid,
                  username: data.username,
                  address: data.address,
                  tel: data.tel,
                  zipcode: data.zipcode,
                })
              );
            });
          });
      } else {
        dispatch(push('/login'));
      }
    });
  };
};

export const fetchCart = (uid) => {
  return async (dispatch) => {
    const cartList = [];

    if (uid) {
      const ordersRef = db.collection('users').doc(uid).collection('orders');

      ordersRef
        .where('status', '==', 0)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartList.push(doc.data());
          });
          dispatch(fetchCartAction(cartList));
        });
    }
  };
};
