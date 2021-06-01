import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CancelIcon from "@material-ui/icons/Cancel";
import HistoryIcon from "@material-ui/icons/History";
// import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Link from "@material-ui/core/Link";
import { fetchOrders } from "../reducks/users/operations";
import { getOrders } from "../reducks/users/selector";
import { fetchProducts } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import { fetchTopping } from "../reducks/topping/operations";
import { getTopping } from "../reducks/topping/selectors";
import { Link } from "react-router-dom";
import { setCancel } from "../reducks/users/operations";
import Grid from "@material-ui/core/Grid";
// import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import { getUserId } from "../reducks/users/selector";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700,
//   },
// });

const OrderHistory = () => {
  const [double, setDouble] = useState(false);
  // const [show, setShow] = useState(false);
  // const [shows, setShows] = useState(true);
  // const [cancel, setCancel] = useState('キャンセル');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const orders = getOrders(selector);
  const products = getProducts(selector);
  // const topping = getTopping(selector);
  const uid = getUserId(selector);
  const selecter2 = useSelector((state) => state);
  const topping = getTopping(selecter2);

  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchTopping());
  // }, [dispatch]);
  useEffect(() => {
    if (uid) {
      dispatch(fetchOrders(uid));
    }
  }, [dispatch, orders, uid]);

  useEffect(() => {
    dispatch(fetchTopping());
  }, [dispatch]);
  // useEffect(()=>{
  //   const unsubscribe =db.collection("users").doc("1CiNypKuOkdRJL7KKGaV5w7QSKB3").collection("orders").onSnapshot(snapshots =>{

  //   })
  // })

  return (
    <React.Fragment>
      {orders === undefined ? (
        ""
      ) : (
        <div align="center">
          {orders.filter((el) => el.status !== 0).length === 0 ? (
            <Grid container alignItems="center" justify="center">
              <Grid item xs={8}>
                <Card>
                  <h1 align="left">
                    &emsp;
                    <HistoryIcon style={{ fontSize: 30 }} color="primary" />
                    &nbsp; 注文履歴&nbsp;
                    {/* <ImportContactsIcon
                      style={{ fontSize: 30 }}
                      color="primary"
                    /> */}
                  </h1>
                  <TableContainer>
                    <Table aria-label="spanning table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">配達日</TableCell>
                          <TableCell align="center">商品名</TableCell>
                          <TableCell align="center">トッピング</TableCell>
                          <TableCell align="center">数量</TableCell>
                          {/* <TableCell align="center">合計金額</TableCell>
                                  <TableCell align="center">お届け先</TableCell> */}
                        </TableRow>
                      </TableHead>
                      {orders === undefined
                        ? ""
                        : orders
                            .filter((order) => order.status !== 0)
                            .map((order) => {
                              return (
                                <TableBody key={order.orderId}>
                                  <TableRow>
                                    <TableCell align="center">
                                      <h3>{order.orderDate}に配達</h3>
                                    </TableCell>
                                    {/* <TableCell align="center">
                                    <h4>{}円</h4>
                                  </TableCell>
                                  <TableCell></TableCell> */}
                                    <TableCell colSpan="4"></TableCell>
                                  </TableRow>
                                  {order.itemInfo.map((itemInfos) => {
                                    return products === undefined
                                      ? ""
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
                                                      pathname: "/itemdetail",
                                                      selectedItemId:
                                                        product.id,
                                                    }}
                                                    key={product.id}
                                                  >
                                                    {product.name}
                                                  </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                  {itemInfos.toppings.map(
                                                    (topp) => {
                                                      return topping ===
                                                        undefined
                                                        ? ""
                                                        : topping
                                                            .filter(
                                                              (toppings) =>
                                                                toppings.id ===
                                                                topp.toppingId
                                                            )
                                                            .map((toppings) => {
                                                              return (
                                                                <p
                                                                  key={
                                                                    toppings.id
                                                                  }
                                                                >
                                                                  {
                                                                    toppings.name
                                                                  }
                                                                </p>
                                                              );
                                                            });
                                                    }
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
                                                      pathname: "/itemdetail",
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
                                      <h3>合計金額：{}円</h3>
                                    </TableCell>
                                    <TableCell align="center">
                                      {order.status !== 9 ? (
                                        <div>
                                          <Button
                                            variant="contained"
                                            startIcon={<CancelIcon />}
                                            disabled={
                                              order.status === 9 || double
                                            }
                                            onClick={() => {
                                              // doSomething();
                                              setDouble(true);
                                              // setShow(true);
                                              setCancel(order.orderId);
                                            }}
                                          >
                                            {order.status === 9 || double
                                              ? "キャンセル済み"
                                              : "キャンセル"}
                                          </Button>
                                        </div>
                                      ) : (
                                        <div>
                                          <Button
                                            variant="contained"
                                            startIcon={<CancelIcon />}
                                            disabled={order.status === 9}
                                            onClick={() => {
                                              // doSomething();
                                              // setDouble(true);
                                              setCancel(order.orderId);
                                            }}
                                          >
                                            {order.status === 9
                                              ? "キャンセル済み"
                                              : "キャンセル"}
                                          </Button>
                                          {/* &emsp; &emsp; &emsp; &emsp; &emsp;
                                          &emsp; &emsp;
                                          <Button
                                            showresults={shows}
                                            onClick={() => {
                                              resetCancel(order.orderId);
                                              setDouble(false);
                                              setShows(false);
                                            }}
                                          >
                                            キャンセルを取り消し
                                          </Button> */}
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
              <Link to={{ pathname: "/" }}>
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
