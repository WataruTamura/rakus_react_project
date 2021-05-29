import React,{useEffect} from 'react';
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
import { getOrders} from '../reducks/users/selector'
import { getTopping } from '../reducks/topping/selectors';
import { fetchTopping } from '../reducks/topping/operations';
import { fetchProducts } from '../reducks/products/operations';
import { fetchOrders } from '../reducks/users/operations';
import {CardMedia} from '@material-ui/core'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


//export default function CartList()
const CartList = () =>{

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //cart-----------------------

  const orders = getOrders(selector)

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  console.log(orders);

  //topping-----------------
  const selecter2 = useSelector((state) => state)

  const topping = getTopping(selecter2);

  console.log(topping);

  useEffect(() => {
    dispatch(fetchTopping());
  }, [dispatch]);
//------------------------------

   const classes = useStyles();

  // const cartItem = []
  //  if(orders){

  //   const filterCart = orders.filter(el => el.status ===0)
  //   console.log(filterCart.itemInfo);

  // filterCart.forEach(el => {
  //   products.forEach(el1 => {
      
  //     if(el.id === el1.id){

  //       const newcart = {
  //         ...el,
  //         ...el1,
  //       }
  //       cartItem.push(newcart)
  //     }
  //   })
  // })
  //  }
  // console.log(cartItem);

  // const filterCart = cartItem.filter(el => el.status ===0)

  // console.log(filterCart);

  const shoukei = 0
  

  return (

    <>
    <h2>ショッピングカート</h2>
    <div>
      
    {orders === undefined ? 
    <h2>カートに商品がありません</h2> :
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>商品名</TableCell>
          <TableCell align="right">数量/サイズ/価格（税抜）</TableCell>
          <TableCell align="right">トッピング/価格（税抜）</TableCell>
          <TableCell align="right">小計</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      {orders
                .filter((order) => order.status === 0)
                .map((order) => (
                  <TableRow key={order.id}>
                    {order.itemInfo.map((itemInfos) => (
                      <TableCell key={itemInfos.itemId}>
                        {/* {itemInfos.itemNum}個 */}
                        {products === undefined
                          ? ""
                          : products
                              .filter(
                                (product) => product.id == itemInfos.itemId
                              )
                              .map((product) => {
                                return (
                                  <>
                                  <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image={product.imagePath}
                        title="Contemplative Reptile"
                      />
                                  <div key={product.id}>{product.name}</div>
                                  </>
                                );
                              })}
                      </TableCell>
                    ))}
                    {order.itemInfo.map((itemInfos) => (
                      <TableCell key={itemInfos.itemId}>
                        {itemInfos.itemNum}個
                        {products === undefined
                          ? ""
                          : products
                              .filter(
                                (product) => product.id == itemInfos.itemId
                              )
                              .map((product) => {
                                return (
                                  itemInfos.itemSize==0 ? <div><div>Mサイズ</div> <div>{product.Mprice} 円</div> </div>: 
                                  <div><div>Lサイズ</div> <div>{product.Lprice} 円</div> </div>
                                );
                              })}
                      </TableCell>
                      
                    ))}
                    {order.itemInfo.map((itemInfos) => (
                      <TableCell key={itemInfos.itemId}>

                        
                        <div>
                          {
                            itemInfos.toppings.map((top) => (
                              <div>
                                {
                                  topping === undefined ?
                                  "" :
                                  topping.filter(
                                    to => to.id === top.toppingId
                                  ).map((to) => {
                                    return (
                                      top.toppingSize === 0 ? <><div>{to.name}</div><div>普通/{to.Mprice} 円</div></> : 
                                      <><div>{to.name}</div><div>多め/{to.Lprice} 円</div></>
                                    )
                                  })
                                }
                              </div>
                            ))
                          }
                        </div>

                        
                        
                      </TableCell>
                      
                      
                    ))}
                  </TableRow>
                ))}


        {/* {
        
        orders
        .map((row) => (
          <div>
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
            <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="200"
                        image={row.imagePath}
                        title="Contemplative Reptile"
                      />
              <div></div>
              {row.name}
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
            </TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
          </div>
        ))} */}
      </TableBody>
    </Table>
  </TableContainer>
  }
  </div>
    </>
  );
}
export default CartList
