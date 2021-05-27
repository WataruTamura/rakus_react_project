import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

const store = () => {
  return createStore(
    combineReducers({
      products: ProductsReducer,
      users: UsersReducer,
    }),
    applyMiddleware(thunk)
  );
};

export default store;
