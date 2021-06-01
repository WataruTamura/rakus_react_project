import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
//import history from '@function/history';

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
