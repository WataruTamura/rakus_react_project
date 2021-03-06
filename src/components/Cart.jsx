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
//import { FetchCart } from '../reducks/products/operations';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

//export default function CartList()
const Cart = () => {
  const location = useLocation();
  const history = useHistory();
  const selector = useSelector((state) => state);
  const selecter2 = useSelector((state) => state);
  const topping = getTopping(selecter2);
  const orders = getOrders(selector);
  const uid = getUserId(selector);

  const [total, setTotalPrice] = useState(0);
  // const [priceTopping, setPriceTopping] = useState(0);

  // const createToppingPrice = () => {
  //   let toppingPrice = 0;
  //   const filterOrder = orders.filter((order) => order.status === 0);
  //   filterOrder.forEach((item) => {
  //     item.itemInfo.forEach((el) => {
  //       el.toppings.forEach((el1) => {
  //         if (topping) {
  //           const selectTopping = topping.filter(
  //             (top) => top.id === el1.toppingId
  //           );
  //           selectTopping.forEach((el5) => {
  //             if (el1.toppingSize === 0) {
  //               toppingPrice = toppingPrice + el5.Mprice;
  //               toppingArray.push(toppingPrice);
  //             } else {
  //               toppingPrice = toppingPrice + el5.Lprice;
  //               toppingArray.push(toppingPrice);
  //             }
  //           });
  //         }
  //       });
  //     });
  //   });
  //   setPriceTopping(toppingPrice);

  //   toppingArray.push(toppingPrice);
  // };

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

  // useEffect(() => {
  //   createToppingPrice();
  // },[]);

  useEffect(() => {
    createTotalPrice();
  });

  const dispatch = useDispatch();

  const products = getProducts(selector);

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
  //console.log(orders);

  let toppingPrice = 0;
  // const topPriceArray = []

  return (
    <div className="cartlist">
      {orders === undefined ? (
        ''
      ) : orders.filter((el) => el.status === 0).length === 0 ? (
        <div align="center">
          <h2>??????????????????????????????</h2>
          <Link to={{ pathname: '/' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
            >
              ?????????????????????
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
                      <TableCell>?????????</TableCell>
                      <TableCell align="right">
                        ??????/?????????/??????????????????
                      </TableCell>
                      <TableCell align="right">
                        ???????????????/??????????????????
                      </TableCell>
                      <TableCell align="right">??????</TableCell>
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
                                                alt="????????????"
                                                height="100px"
                                                align="center"
                                              />
                                              <div>{product.name}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                              <div>{itemInfos.itemNum}???</div>
                                              <div>
                                                {itemInfos.itemSize === 0 ? (
                                                  <div>M?????????</div>
                                                ) : (
                                                  <div>L?????????</div>
                                                )}
                                              </div>
                                              <div>
                                                {itemInfos.itemSize === 0 ? (
                                                  <div>
                                                    {product.Mprice.toLocaleString()}
                                                    ???/???
                                                  </div>
                                                ) : (
                                                  <div>
                                                    {product.Lprice.toLocaleString()}
                                                    ???/???
                                                  </div>
                                                )}
                                              </div>
                                            </TableCell>
                                            <TableCell align="center">
                                              {itemInfos.toppings.length ===
                                              0 ? (
                                                <div>??????</div>
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
                                                                    <div></div>
                                                                    <div>
                                                                      {topp.toppingSize ===
                                                                      0 ? (
                                                                        <>
                                                                          <div>
                                                                            {
                                                                              toppings.name
                                                                            }
                                                                            /+1???/+
                                                                            {toppings.Mprice.toLocaleString()}
                                                                            ???
                                                                          </div>
                                                                        </>
                                                                      ) : (
                                                                        <>
                                                                          <div>
                                                                            {
                                                                              toppings.name
                                                                            }
                                                                            /+2???/+
                                                                            {toppings.Lprice.toLocaleString()}
                                                                            ???
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
                                                  ???
                                                </div>
                                              ) : (
                                                <div>
                                                  {(
                                                    (product.Lprice +
                                                      toppingPrice) *
                                                    itemInfos.itemNum
                                                  ).toLocaleString()}
                                                  ???
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
                                                {location.pathname ===
                                                '/orderconfirm' ? (
                                                  <></>
                                                ) : (
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
                                                    ??????
                                                  </Button>
                                                )}
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
            ????????????{Math.round(total * 0.1).toLocaleString()}???
          </h2>
          <h2 className="center">
            ???????????????????????????{Math.round(total * 1.1).toLocaleString()}???
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
                ??????????????????????????????
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
export default Cart;
