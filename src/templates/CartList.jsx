import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../reducks/products/selectors';
import { getOrders } from '../reducks/users/selector';
import { getTopping } from '../reducks/topping/selectors';
import { fetchTopping } from '../reducks/topping/operations';
import { fetchProducts } from '../reducks/products/operations';
import { fetchOrders } from '../reducks/users/operations';
import { Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { DeleteOrdersInfo } from '../reducks/topping/operations';
import { getUserId } from '../reducks/users/selector';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { fetchCart } from '../reducks/users/operations';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CartList = () => {
  const location = useLocation();
  const history = useHistory();
  const selector = useSelector((state) => state);
  const selecter2 = useSelector((state) => state);
  const topping = getTopping(selecter2);
  const orders = getOrders(selector);
  const uid = getUserId(selector);
  const dispatch = useDispatch();
  const products = getProducts(selector);
  const [total, setTotalPrice] = useState(0);

  const createTotalPrice = () => {
    let totalPrice = 0;
    const filterOrder = orders.filter((order) => order.status === 0);
    filterOrder.forEach((item) => {
      item.itemInfo.forEach((el) => {
        if (products) {
          const selectProducts = products.filter(
            (product) => product.id === el.itemId
          );
          selectProducts.forEach((select) => {
            if (el.itemSize === 0) {
              totalPrice = totalPrice + select.Mprice * el.itemNum;
            } else {
              totalPrice = totalPrice + select.Lprice * el.itemNum;
            }
          });
        }
        el.toppings.forEach((el1) => {
          if (topping) {
            const selectTopping = topping.filter(
              (top) => top.id === el1.toppingId
            );
            selectTopping.forEach((el5) => {
              if (el1.toppingSize === 0) {
                totalPrice = totalPrice + el5.Mprice * el.itemNum;
              } else {
                totalPrice = totalPrice + el5.Lprice * el.itemNum;
              }
            });
          }
        });
      });
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    createTotalPrice();
  });

  useEffect(() => {
    dispatch(fetchCart(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //cart-----------------------

  useEffect(() => {
    if (uid) {
      dispatch(fetchOrders(uid));
    }
  }, [dispatch, orders, uid]);

  useEffect(() => {
    dispatch(fetchTopping());
  }, [dispatch]);
  //------------------------------

  const classes = useStyles();

  let toppingPrice = 0;

  return (
    <div className="cartlist">
      <h2 className="center">ショッピングカート</h2>
      {orders === undefined ? (
        ''
      ) : orders.filter((el) => el.status === 0).length === 0 ? (
        <div align="center">
          <h2>カートの中身は空です</h2>
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
      ) : (
        <div>
          <div>
            {orders === undefined ? (
              ''
            ) : (
              <TableContainer component={Paper} key={orders.id}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>商品名</TableCell>
                      <TableCell align="right">
                        数量/サイズ/価格（税抜）
                      </TableCell>
                      <TableCell align="right">
                        トッピング/価格（税抜）
                      </TableCell>
                      <TableCell align="right">小計</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  {orders === undefined
                    ? ''
                    : orders
                        .filter((order) => order.status === 0)
                        .map((order, index) => {
                          return (
                            <TableBody key={index}>
                              {order.itemInfo.map((itemInfos) => {
                                return products === undefined
                                  ? ''
                                  : products
                                      .filter(
                                        (product) =>
                                          product.id === itemInfos.itemId
                                      )
                                      .map((product, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <TableCell align="center">
                                              <img
                                                src={product.imagePath}
                                                alt="アイコン"
                                                height="100px"
                                                align="center"
                                              />
                                              <div>{product.name}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                              <div>{itemInfos.itemNum}個</div>
                                              <div>
                                                {itemInfos.itemSize === 0 ? (
                                                  <div>Mサイズ</div>
                                                ) : (
                                                  <div>Lサイズ</div>
                                                )}
                                              </div>
                                              <div>
                                                {itemInfos.itemSize === 0 ? (
                                                  <div>
                                                    {product.Mprice.toLocaleString()}
                                                    円/個
                                                  </div>
                                                ) : (
                                                  <div>
                                                    {product.Lprice.toLocaleString()}
                                                    円/個
                                                  </div>
                                                )}
                                              </div>
                                            </TableCell>
                                            <TableCell align="center">
                                              {itemInfos.toppings.length ===
                                              0 ? (
                                                <div>なし</div>
                                              ) : (
                                                <div>
                                                  {itemInfos.toppings.map(
                                                    (topp) => {
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
                                                                toppings,
                                                                index
                                                              ) => {
                                                                if (
                                                                  topp.toppingSize ===
                                                                  0
                                                                ) {
                                                                  toppingPrice =
                                                                    toppingPrice +
                                                                    toppings.Mprice;
                                                                } else {
                                                                  toppingPrice =
                                                                    toppingPrice +
                                                                    toppings.Lprice;
                                                                }
                                                                return (
                                                                  <div
                                                                    key={index}
                                                                  >
                                                                    {/* <div></div> */}
                                                                    <div>
                                                                      {topp.toppingSize ===
                                                                      0 ? (
                                                                        <>
                                                                          <div>
                                                                            {
                                                                              toppings.name
                                                                            }
                                                                            /+1倍/+
                                                                            {toppings.Mprice.toLocaleString()}
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
                                                                            {toppings.Lprice.toLocaleString()}
                                                                            円
                                                                          </div>
                                                                        </>
                                                                      )}
                                                                    </div>
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
                                              {itemInfos.itemSize === 0 ? (
                                                <div>
                                                  {(
                                                    (product.Mprice +
                                                      toppingPrice) *
                                                    itemInfos.itemNum
                                                  ).toLocaleString()}
                                                  円
                                                </div>
                                              ) : (
                                                <div>
                                                  {((product.Lprice +
                                                    toppingPrice) *
                                                    itemInfos.itemNum).toLocaleString()}
                                                  円
                                                </div>
                                              )}
                                              <div className="hide">
                                                {itemInfos.toppings.map(
                                                  (el) => (toppingPrice = 0)
                                                )}
                                              </div>
                                            </TableCell>

                                            <TableCell align="center">
                                              <div>
                                                <Button
                                                  key={order.id}
                                                  variant="contained"
                                                  color="primary"
                                                  onClick={() => {
                                                    dispatch(
                                                      DeleteOrdersInfo(
                                                        uid,
                                                        itemInfos,
                                                        order.orderId
                                                      )
                                                    );
                                                  }}
                                                >
                                                  削除
                                                </Button>
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      });
                              })}
                            </TableBody>
                          );
                        })}
                </Table>
              </TableContainer>
            )}
          </div>
          <h2 className="center">
            消費税：{Math.round(total * 0.1).toLocaleString()}円
          </h2>
          <h2 className="center">
            合計金額（税込）：{Math.round(total * 1.1).toLocaleString()}円
          </h2>
          <div className="center">
            {location.pathname === '/cartlist' ? (
              <Button
                onClick={() =>
                  history.push('/orderconfirm', {
                    sumPrice: Math.round(total * 1.1),
                  })
                }
                variant="contained"
                color="primary"
              >
                注文確認画面に進む
              </Button>
            ) : (
              <> </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CartList;
