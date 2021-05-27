import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  ItemList,
  ItemDetail,
  CartList,
  OrderConfirm,
  OrderFinished,
  OrderHistory,
} from './templates';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ItemList} />
        <Route exact path="/itemdetail/:id" component={ItemDetail} />
        <Route exact path="/cartlist" component={CartList} />
        <Route exact path="/orderconfirm" component={OrderConfirm} />
        <Route exact path="/orderfinished" component={OrderFinished} />
        <Route exact path="/orderhistory" component={OrderHistory} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
