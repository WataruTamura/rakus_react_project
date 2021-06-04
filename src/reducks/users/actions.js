export const SIGN_UP = 'SIGN_UP';
export const signUpAction = (username, email, zipcode, address, tel) => {
  return {
    type: 'SIGN_UP',
    payload: [username, email, zipcode, address, tel],
  };
};

export const SIGN_IN = 'SIGN_IN';
export const signInAction = (userState) => {
  return {
    type: 'SIGN_IN',
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
      zipcode: userState.zipcode,
      tel: userState.tel,
      address: userState.address,
      email: userState.email,
    },
  };
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: null,
  };
};

export const SET_USER_ACTION = 'SET_USER_ACTION';
export const setUserAction = (user) => {
  console.log(user);
  return {
    type: SET_USER_ACTION,
    payload: user,
  };
};

export const DELETE_USER_ACTION = 'DELETE_USER_ACTION';
export const deleteUserAction = (user) => {
  return {
    type: DELETE_USER_ACTION,
    payload: user,
  };
};

export const FETCH_ORDERS = 'fetch_orders';
export const fetchOrdersAction = (orders) => {
  return {
    type: 'fetch_orders',
    payload: orders,
  };
};

export const FETCH_CART = 'fetch_cart';
export const fetchCartAction = (cartList) => {
  
  return {
    type: FETCH_CART,
    payload: cartList,
  };
};

// export const ADD_PAYMENT_INFO_ACTION = 'add_payment_info_action';
// export const addPaymentInfoAction = (paymentInfo) => {
//   console.log('actions発動')
//   return {
//     type: 'add_payment_info_action',
//     payload: paymentInfo,
//   };
// };
