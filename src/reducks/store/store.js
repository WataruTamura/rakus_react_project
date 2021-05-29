import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';
import { ToppingReducer } from '../topping/reducers';

import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createLogger } from 'redux-logger';

// const store = () => {
//   return createStore(
//     combineReducers({
//       products: ProductsReducer,
//       users: UsersReducer,
//     }),
//     applyMiddleware(thunk,routerMiddleware(history),)
//   );
// };

// export default store;

export default function createStore(history) {
  // Define individual settings of redux-logger
  let middleWares = [routerMiddleware(history), thunk];
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      collapsed: true,
      diff: true,
    });
    middleWares.push(logger);
  }

  return reduxCreateStore(
    combineReducers({
      products: ProductsReducer,
      router: connectRouter(history),
      topping: ToppingReducer,
      users: UsersReducer,
      // sum: SumPriceReducer,
    }),
    applyMiddleware(...middleWares)
  );
}
//router: connectRouter(history)
