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
import { getProductsInCart } from '../reducks/users/selector'
import { getTopping } from '../reducks/topping/selectors';
import { fetchTopping } from '../reducks/topping/operations';
import { fetchProducts } from '../reducks/products/operations';


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
  

  const selecter = useSelector((state) => state)
  const productInCart = getProductsInCart(selecter)
  console.log(productInCart);

  //topping-----------------
  const selecter2 = useSelector((state) => state)

  const topping = getTopping(selecter2);

  console.log(topping);

  useEffect(() => {
    dispatch(fetchTopping());
  }, [dispatch]);
//------------------------------

  const classes = useStyles();

  const cartItem = []
  if(productInCart){
    

  productInCart.forEach(el => {
    products.forEach(el1 => {
      const newcart = {
        ...el,
        ...el1,
      }
      if(el.id === el1.id){
        cartItem.push(newcart)
      }
    })
  })
  }

  

  return (

    <>
    <h2>ショッピングカート</h2>
    <div>
    {productInCart === undefined ? 
    <h2>カートに商品がありません</h2> :
    <TableContainer component={Paper}>
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>商品名</TableCell>
          <TableCell align="right">サイズ/価格（税抜）/数量</TableCell>
          <TableCell align="right">トッピング/価格（税抜）</TableCell>
          <TableCell align="right">小計</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
        
        cartItem.filter(el => el.status === 0).map((row) => (
          <div>
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.imagePath}
              <div></div>
              {row.name}
            </TableCell>
            <TableCell align="right">{row.size}サイズ/{row.price}/{row.itemNum}</TableCell>
            <TableCell align="right">{row.name}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
          </div>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  }
  </div>
    </>
  );
}
export default CartList
