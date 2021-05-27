import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    maxWidth: 345,
    margin: 20,
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

const ItemList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <>
      <Search />
      <div className={classes.flex}>
        {products === undefined
          ? ''
          : products.map((product) => {
              return (
                <Card className={classes.root} key={product.id}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="200"
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
              );
            })}
      </div>
    </>
  );
};

export default ItemList;
