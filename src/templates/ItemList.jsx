import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Search } from '../components/index';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';

const useStyles = makeStyles({
  root: {
    maxWidth: 370,
    margin: 20,
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

const ItemList = () => {
  const [filterText, setFilterText] = useState('')
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  console.log(products);
  let showProducts = [];

  const alertDelete = () => {
    alert('該当する商品はありません')
    setFilterText('')
  }
  
  if (products !== undefined) {
    showProducts = products.filter(product => {
      if (product.name.indexOf(filterText) !== -1) {
        return product
      }
    })
  };
  
  console.log(showProducts)
  console.log(filterText)

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const classes = useStyles();
  
  return (
    <>
      <Search setText={setFilterText} />
      <div className={classes.flex}>
        {products === undefined
          ? ''
          : showProducts.length !== 0 ? showProducts.map((product) => {
              return (
                <Link
                  to={{ pathname: '/itemdetail', selectedItemId: product.id }}
                  key={product.id}
                >
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="220"
                        image={product.imagePath}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <span>L:{product.Lprice.toLocaleString()}円</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span>M:{product.Mprice.toLocaleString()}円</span>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              );
          })
            : alertDelete()
        }
      </div>
    </>
  );
};

export default ItemList;
