import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CancelIcon from '@material-ui/icons/Cancel';
import HistoryIcon from '@material-ui/icons/History';
import Card from '@material-ui/core/Card';
import { fetchOrders } from '../reducks/users/operations';
import { getOrders } from '../reducks/users/selector';
import { getProducts } from '../reducks/products/selectors';
import { getTopping } from '../reducks/topping/selectors';
import { Link } from 'react-router-dom';
import { setCancel } from '../reducks/users/operations';
import Grid from '@material-ui/core/Grid';
import { getUserId } from '../reducks/users/selector';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const topping = getTopping(selector);
  const orders = getOrders(selector);
  const uid = getUserId(selector);

  useEffect(() => {
    if (uid) {
      dispatch(fetchOrders(uid));
    }
  }, [dispatch, uid, orders]);

  const a = (time) => {
    // console.log(time);
    const b = new Date(time);
    // const c = Date.now();
    return (
      b.getFullYear() +
      '年' +
      (b.getMonth() + 1) +
      '月' +
      b.getDate() +
      '日' +
      b.getHours() +
      '時頃'
    );
  };

  return (
    <React.Fragment>
      {orders === undefined ? (
        ''
      ) : (
        <div align="center">
          {orders.filter((order) => order.status !== 0).length !== 0 ? (
            <Grid container alignItems="center" justify="center">
              <Grid item xs={8}>
                <Card>
                  <h1 align="left">
                    &emsp;
                    <HistoryIcon style={{ fontSize: 30 }} color="primary" />
                    &nbsp; 注文履歴
                  </h1>
                  <TableContainer>
                    <Table aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">配達日</TableCell>
                          <TableCell align="center">商品名</TableCell>
                          <TableCell align="center">トッピング</TableCell>
                          <TableCell align="center">数量</TableCell>
                        </TableRow>
                      </TableHead>
                      {orders === undefined
                        ? ''
                        : orders
                            .filter((order) => order.status !== 0)
                            .map((order) => {
                              return (
                                <TableBody key={order.orderId}>
                                  <TableRow>
                                    <TableCell align="center">
                                      <h3>
                                        {a(order.orderDate.seconds * 1000)}
                                        に注文済み
                                      </h3>
                                    </TableCell>
                                    <TableCell colSpan="4"></TableCell>
                                  </TableRow>
                                  {order.itemInfo.map((itemInfos) => {
                                    return products === undefined
                                      ? ''
                                      : products
                                          .filter(
                                            (product) =>
                                              product.id === itemInfos.itemId
                                          )
                                          .map((product) => {
                                            return (
                                              <TableRow key={product.id}>
                                                <TableCell align="center">
                                                  <img
                                                    src={product.imagePath}
                                                    alt="アイコン"
                                                    height="100px"
                                                    align="center"
                                                  />
                                                </TableCell>
                                                <TableCell align="center">
                                                  <Link
                                                    to={{
                                                      pathname: '/itemdetail',
                                                      selectedItemId:
                                                        product.id,
                                                    }}
                                                    key={product.id}
                                                  >
                                                    {product.name}
                                                  </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                  {itemInfos.toppings.length ===
                                                  0 ? (
                                                    <p>なし</p>
                                                  ) : (
                                                    <div>
                                                      {itemInfos.toppings.map(
                                                        (topp, index) => {
                                                          return topping ===
                                                            undefined
                                                            ? ''
                                                            : topping
                                                                .filter(
                                                                  (toppings) =>
                                                                    toppings.id ===
                                                                    topp.toppingId
                                                                )
                                                                .map(
                                                                  (
                                                                    toppings
                                                                  ) => {
                                                                    return (
                                                                      <div
                                                                        key={
                                                                          index
                                                                        }
                                                                      >
                                                                        {topp.toppingSize ===
                                                                        0 ? (
                                                                          <>
                                                                            <div>
                                                                              {
                                                                                toppings.name
                                                                              }
                                                                              /+1倍/+
                                                                              {
                                                                                toppings.Mprice
                                                                              }
                                                                              円
                                                                            </div>
                                                                          </>
                                                                        ) : (
                                                                          <>
                                                                            <div>
                                                                              {
                                                                                toppings.name
                                                                              }
                                                                              /+2倍/+
                                                                              {
                                                                                toppings.Lprice
                                                                              }
                                                                              円
                                                                            </div>
                                                                          </>
                                                                        )}
                                                                      </div>
                                                                    );
                                                                  }
                                                                );
                                                        }
                                                      )}
                                                    </div>
                                                  )}
                                                </TableCell>
                                                <TableCell
                                                  key={itemInfos.itemId}
                                                  align="center"
                                                >
                                                  {itemInfos.itemNum}個
                                                </TableCell>
                                                <TableCell align="center">
                                                  <Link
                                                    to={{
                                                      pathname: '/itemdetail',
                                                      selectedItemId:
                                                        product.id,
                                                    }}
                                                    key={product.id}
                                                  >
                                                    <Button
                                                      variant="contained"
                                                      color="primary"
                                                      startIcon={
                                                        <AddShoppingCartIcon />
                                                      }
                                                    >
                                                      もう一度注文する
                                                    </Button>
                                                  </Link>
                                                </TableCell>
                                              </TableRow>
                                            );
                                          });
                                  })}
                                  <TableRow>
                                    <TableCell colSpan={4} align="right">
                                      <h3>合計金額：{order.totalPrice.toLocaleString()}円</h3>
                                    </TableCell>
                                    <TableCell align="center">
                                      {order.status !== 9 ? (
                                        <div>
                                          <Button
                                            variant="contained"
                                            startIcon={<CancelIcon />}
                                            disabled={order.status === 9}
                                            onClick={() => {
                                              setCancel(order.orderId, uid);
                                            }}
                                          >
                                            {order.status === 9
                                              ? 'キャンセル済み'
                                              : 'キャンセル'}
                                          </Button>
                                        </div>
                                      ) : (
                                        <div>
                                          <Button
                                            variant="contained"
                                            startIcon={<CancelIcon />}
                                            disabled={order.status === 9}
                                            onClick={() => {
                                              setCancel(order.orderId);
                                            }}
                                          >
                                            {order.status === 9
                                              ? 'キャンセル済み'
                                              : 'キャンセル'}
                                          </Button>
                                        </div>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              );
                            })}
                    </Table>
                  </TableContainer>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <div align="center">
              <h2>注文履歴がありません</h2>
              <Link to={{ pathname: '/' }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                >
                  メニューに戻る
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderHistory;
