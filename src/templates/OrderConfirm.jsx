import React,{ useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { orderError } from '../reducks/validation/operation';
import { useDispatch } from "react-redux";
import { OrderError } from '../reducks/validation/operation';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import { getUserName } from '../reducks/users/selector';

const OrderConfirm = () => {
const dispatch = useDispatch();
const history = useHistory();

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const classes = useStyles();

const [destinationUserName, setDestinationUserName] = useState("")

const [destinationEmail, setDestinationEmail] = useState("")

const [destinationZipcode, setDestinationZipcode] = useState("")

const [destinationAddress, setDestinationAddress] = useState("")

const [destinationTel, setDestinationTel] = useState("")

const [destinationDate, setDestinationDate] = useState("")

const inputOrderUserName = useCallback((e) => {
  setDestinationUserName(e.target.value)
},[setDestinationUserName]);

const inputOrderEmail = useCallback((e) => {
  setDestinationEmail(e.target.value)
},[setDestinationEmail]);

const inputOrderZipcode = useCallback((e) => {
  setDestinationZipcode(e.target.value)
},[setDestinationZipcode]);

const inputOrderAddress = useCallback((e) => {
  setDestinationAddress(e.target.value)
},[setDestinationAddress]);

const inputOrderTel = useCallback((e) => {
  setDestinationTel(e.target.value)
},[setDestinationTel]);

const inputOrderDate = useCallback((e) => {
  setDestinationDate(e.target.value)
},[setDestinationDate]);


const orderClicked =(
  destinationUserName,
  destinationEmail,
  destinationZipcode,
  destinationAddress,
  destinationTel,
  destinationDate
  ) => {
    dispatch(OrderError(
      destinationUserName,
      destinationEmail,
      destinationZipcode,
      destinationAddress,
      destinationTel,
      destinationDate))
  
  if(destinationUserName,
    destinationEmail,
    destinationZipcode,
    destinationAddress,
    destinationTel,
    destinationDate){
      console.log('入力完了してます')
      history.push('/orderfinished')
    }
}

  return (
    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        お届け先情報入力
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="username"
            name="username"
            label="Name"
            fullWidth
            autoComplete="given-name"
            placeholder="Enter your name"
            onChange={inputOrderUserName}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              required
              id="mail"
              name="mail"
              label="Mail Address"
              fullWidth
              autoComplete="shipping mail"
              onChange={inputOrderEmail}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zipcode"
            name="zipcode"
            label="Zipcode"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={inputOrderZipcode}
          />
        </Grid>
        <Grid item xs={12}>
            <TextField
            required
            id="address1"
            name="address"
            label="Address line"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={inputOrderAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tel"
            name="tel"
            label="Phone Number"
            fullWidth
            autoComplete="shipping phone"
            onChange={inputOrderTel}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="datetime-local"
          label="delivery day"
          type="datetime-local"
          name="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={inputOrderDate}
          />
        </Grid>
        </Grid>
        <div className={classes.root}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          name="button"
          onClick={() => orderClicked(destinationUserName,destinationEmail,destinationZipcode,destinationAddress,destinationTel,destinationDate)}
        >
            送信
        </Button>
          <Link to="cartlist">
            <Button variant="outlined">ショッピングカートに戻る</Button>
          </Link>
          </div>
    </React.Fragment>
  );
};

export default OrderConfirm;
