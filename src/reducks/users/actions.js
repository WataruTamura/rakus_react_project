export const SIGN_IN = "SIGN_IN";
export const signInAction = (user) => {
  return {
    type: "SIGN_IN",
    payload: user
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
    },
  };
};

export const SET_USER_ACTION = "SET_USER_ACTION";
export const setUserAction = (user) => {
  return {
    type: SET_USER_ACTION,
    payload: user,
  };
};

export const DELETE_USER_ACTION = "DELETE_USER_ACTION";
export const deleteUserAction = (user) => {

  return {
    type: DELETE_USER_ACTION,
    payload: user,
  };
};

export const FETCH_ORDERS = "fetch_orders";
export const fetchOrdersAction = (orders) => {
  return {
    type: "fetch_orders",
    payload: orders,
  };
};

