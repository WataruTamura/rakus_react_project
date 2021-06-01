/* eslint-disable */ //⇦ESLintの警告を非常時にする
import { db, auth, FirebaseTimestamp } from '../../firebase/index';
import {
  isValidEmailFormat,
  isValidRequiredInput,
} from '../../function/common';
import {
  signInAction,
  fetchOrdersAction,
  signUpAction,
  signOutAction,
} from './actions';
import { createBrowserHistory } from 'history';
//const usersRef = db.collection('users')
import { useDispatch } from 'react-redux';
//import { useHistory } from "react-router";

const pattern = /^[0-9]{3}-[0-9]{4}$/;

// const handleLink = path => history.push(path);
//const browserHistory = createBrowserHistory();

export const signUp = (
  username,
  email,
  zipcode,
  address,
  tel,
  password,
  confirmPassword
) => {
  //const history = useHistory();
  const browserHistory = createBrowserHistory();

  return async (dispatch) => {
    // Validations
    if (
      !isValidRequiredInput(
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
      console.log(zipcode);
      alert('郵便番号は XXX-XXXX の形式で入力してください');
      return false;
    }
    if (tel.match(/\A0[5789]0[-(]?\d{4}[-)]?\d{4}\z/)) {
      alert('電話番号は XXXX-XXXX-XXXX の形式で入力してください');
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
              console.log(username);
              console.log('DB保存成功');
              browserHistory.push('/');
              console.log('DB');
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
            browserHistory.push('/');
          });
        });
    });
  };
};

export default signIn;
// const SignIn = (email, password) => {
//   return async (dispatch) => {
//     // console.log("ログイン");

//     if (email === "" || password === "") {
//       alert("必須項目が未入力です。");
//       return false;
//     }

//     auth.signInWithEmailAndPassword(email, password).then((result) => {
//       const user = result.user;
//       console.log(user);
//       if (user) {
//         const uid = user.uid;

//         db.collection(`users/${uid}/userinfo`)
//           .doc(uid)
//           .get()
//           .then((snapshot) => {
//             // console.log('１２３')
//             const data = snapshot.data();
//             console.log(data);

//             dispatch(
//               signInAction({
//                 email: email,
//                 isSignedIn: true,
//                 uid: uid,
//                 // username: username,
//               })
//             );
//             console.log("ログイン済");
//             // dispatch.push('/');
//           });
//       }
//     });
//   };
// };
// export default SignIn

// export const signOut = () => {
//   // return async (dispatch, getState) =>{
//   console.log("ログアウト");
//   auth.signOut().then(() => {
//     dispatch(signOutAction());
//     // dispatch.push("/login");
//   });
// };

export const signOut = () => {
  const browserHistory = createBrowserHistory();
  return async (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(signOutAction());
        browserHistory.push('/login');
      })
      .catch(() => {
        throw new Error('ログアウトに失敗しました。');
      });
  };
};

export const fetchOrders = (uid) => {
  // const uid = getUserId(selector);
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

// 注文履歴を取得（使いたい時に）
// export const fetchOrderHistory = (uid) => {
//   console.log('hoge');
//   const orderHistorylist = [];
//   return async (dispatch) => {
//     const ordersRef = db.collection('users').doc(uid).collection('orders');
//     const getOrderHistory = ordersRef
//       .where('status', '!=', 0)
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           console.log(doc.data());
//           let hoge = {
//             totalPrice: doc.data().totalPrice,
//             itemInfo: doc.data().itemInfo,
//           };
//           orderHistorylist.push(hoge);
//         });
//         // console.log(orderHistorylist);
//         console.log(orderHistorylist);
//       });
//   };
// };

export const addPaymentInfo = (
  uid,
  destinationUserName,
  destinationZipcode,
  destinationAddress,
  destinationTel,
  destinationDate,
  creditCardNo,
  sumPrice,
  paymentValue
) => {
  const ordersRef = db.collection('users').doc(uid).collection('orders');
  console.log(FirebaseTimestamp.now().toDate());
  const timestamp = FirebaseTimestamp.now().toDate();

  return async (dispatch) => {
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
