/* eslint-disable */ //⇦ESLintの警告を非常時にする
import { db, auth, FirebaseTimestamp } from "../../firebase/index";
import {
  isValidEmailFormat,
  isValidRequiredInput,
} from "../../function/common";
import {
  signInAction,
  fetchProductsInCartAction,
  fetchOrdersAction,
} from "./actions";
import { createBrowserHistory } from "history";
//const usersRef = db.collection('users')
import { useDispatch } from "react-redux";

const pattern = /^[0-9]{3}-[0-9]{4}$/;
// const history = useHistory();
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
      alert("必須項目が未入力です。");
      return false;
    }

    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return false;
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう1度お試しください。");
      return false;
    }
    if (password.length < 6) {
      alert("パスワードは6文字以上で入力してください。");
      return false;
    }
    if (!pattern.test(zipcode)) {
      console.log(zipcode);
      alert("郵便番号は XXX-XXXX の形式で入力してください");
      return false;
    }
    if (tel.match(/\A0[5789]0[-(]?\d{4}[-)]?\d{4}\z/)) {
      alert("電話番号は XXXX-XXXX-XXXX の形式で入力してください");
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
              console.log("DB保存成功");
              browserHistory.push("/");
              console.log("DB");
            });
        }
      });
  };
};

export const SignIn = (email, password) => {
  return async (dispatch) => {
    console.log("ログイン");
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      if (user) {
        const uid = user.uid;

        db.collection(`users/${uid}/userinfo`)
          .doc()
          .get()
          .then((snapshot) => {
            // console.log('１２３')
            // const data = snapshot.data()
            console.log(snapshot.data());

            dispatch(
              signInAction({
                isSignedIn: true,
                uid: uid,
                username: username,
              })
            );
            //         console.log('ログイン済')
            //         history.push('/');
            //         console.log('済')
          });
      }
    });
  };
};

export const signOut = () => {
  // return async (dispatch, getState) =>{
  console.log("ログアウト");
  firebase.auth().signOut();
  dispatch(
    signOutAction({
      isSignedIn: false,
      uid: "",
      username: "",
    })
  );
  dispatch.push("/");
};

const ordersRef = db
  .collection("users")
  .doc("1CiNypKuOkdRJL7KKGaV5w7QSKB3")
  .collection("orders");

export const fetchOrders = () => {
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
