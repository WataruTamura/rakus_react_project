import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CancelIcon from '@material-ui/icons/Cancel';
import HistoryIcon from '@material-ui/icons/History';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';

const orders = [
  {
    id: '',
    orderDate: '2021-5-21',
    item_imagePath:
      'https://static.pizzahut.jp/jp/menu/single/desktop_thumbnail_63e36f58-0e6a-43cf-bf5d-721f0cc6bb98.jpg',
    item_name: 'hawaianパラダイス',
    topping_name: 'タコス',
    item_num: '1',
    status: '1',
  },
  {
    id: '',
    orderDate: '2021-6-2',
    item_imagePath:
      'https://static.pizzahut.jp/jp/menu/single/desktop_thumbnail_63e36f58-0e6a-43cf-bf5d-721f0cc6bb98.jpg',
    item_name: 'hawaianパラダイス',
    topping_name: 'タコス',
    item_num: '1',
    status: '1',
  },
  {
    id: '',
    orderDate: '2021-8-2',
    item_imagePath:
      'https://static.pizzahut.jp/jp/menu/single/desktop_thumbnail_63e36f58-0e6a-43cf-bf5d-721f0cc6bb98.jpg',
    item_name: 'hawaianパラダイス',
    topping_name: 'タコス',
    item_num: '1',
    status: '1',
  },
];

const OrderHistory = () => {
  const [double, setDouble] = useState(false);
  const [cancel, setCancel] = useState('キャンセル');

  return (
    <React.Fragment>
      <Card>
        <h1 align="center">
          <HistoryIcon style={{ fontSize: 20 }} color="primary" />
          注文履歴
        </h1>
        <TableContainer>
          <Table aria-label="spanning table">
            <TableHead>
              {/* <TableRow>
                <TableCell colSpan="4">
                  <h1 align="center">
                    <HistoryIcon style={{ fontSize: 20 }} color="primary" />
                    注文履歴
                  </h1>
                </TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell align="center">配達日</TableCell>
                <TableCell align="center">商品名</TableCell>
                <TableCell align="center">トッピング</TableCell>
                <TableCell align="center">数量</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 &&
                orders.map((order) => (
                  <TableRow order={order} key={order.id}>
                    <TableCell>
                      <CardContent align="center">
                        <h3> {order.orderDate}に配達</h3>
                        <img
                          src={order.item_imagePath}
                          alt="アイコン"
                          height="150px"
                          align="center"
                        />
                      </CardContent>
                    </TableCell>
                    <TableCell>
                      <Link>{order.item_name}</Link>
                    </TableCell>
                    <TableCell>{order.topping_name}</TableCell>
                    <TableCell>{order.item_num}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCartIcon />}
                      >
                        もう一度注文する
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  合計金額：{}円
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    startIcon={<CancelIcon />}
                    disabled={double}
                    onClick={() => {
                      // doSomething();
                      setDouble(true);
                      setCancel('キャンセル済み');
                    }}
                  >
                    {cancel}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Button variant="contained" align="center" style={{color:"white"}}>
      メニューに戻る
      </Button> */}
      </Card>
    </React.Fragment>
  );
};

export default OrderHistory;
