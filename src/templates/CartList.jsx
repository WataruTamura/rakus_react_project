import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { getcart } from '../reducks/products/selectors';
//import { fetchCart } from '../reducks/products/operations';
//import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function CartList() {
  const classes = useStyles();
  const rows = [{
    name:'マルゲリータ',
    price:1222,
    carbs:'djdjdjd',
    protein:'dhffhfh',
  }]

  useEffect(() => {

  },[])

  return (

    <>
    <h2>ショッピングカート</h2>
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
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
