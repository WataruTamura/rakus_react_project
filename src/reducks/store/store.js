import { createStore, combineReducers } from 'redux';
import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

const store = () => {
  return createStore(
    combineReducers({
      products: ProductsReducer,
      users: UsersReducer,
    })
  );
};

export default store;
