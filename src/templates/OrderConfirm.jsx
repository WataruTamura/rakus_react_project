import React,{ useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { orderError } from '../reducks/validation/operation';
import { useDispatch } from "react-redux";
import { OrderError } from '../reducks/validation/operation';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import { getUserName } from '../reducks/users/selector';
import { creditcard } from '../reducks/payment/PaymentForm';

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
  const pattern = /^[0-9]{3}-[0-9]{4}$/;
  const pattern2 = /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/;

  const [destinationUserName, setDestinationUserName] = useState("")

  const [destinationEmail, setDestinationEmail] = useState("")

  const [destinationZipcode, setDestinationZipcode] = useState("")

  const [destinationAddress, setDestinationAddress] = useState("")

  const [destinationTel, setDestinationTel] = useState("")

  const [destinationDate, setDestinationDate] = useState("")

  //支払い方法ラジオボタン
  const [value, setValue] = useState('代金引換');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // カード支払い情報
  const [disabled, setDisabled] = useState(true);

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

        if(destinationUserName === '' ||
          destinationEmail === '' ||
          destinationZipcode === '' ||
          destinationAddress === '' ||
          destinationTel === '' ||
          destinationDate === ''){
            console.log('入力完了していません'); 
        } else if((destinationEmail.indexOf('@') == -1) || 
          !pattern.test(destinationZipcode) || 
          !pattern2.test(destinationTel)) {
            console.log('入力完了していません2'); 
        } else {
          history.push('/orderfinished');
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
            id="address"
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
        {/* <Grid item xs={12} sm={6}>
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
        </Grid> */}
        <Grid item xs={12}>
        <TextField
          id="date"
          label="Delivery day"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={inputOrderDate}
        />
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormLabel component="legend">Delivery Time
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel value="10時" labelPlacement="end"
                control={<Radio color="primary" />} 
                label="10時" />
              <FormControlLabel value="11時" 
                control={<Radio color="primary" />} label="11時" />
              <FormControlLabel value="12時" 
                control={<Radio color="primary" />} label="12時" />
              <FormControlLabel value="13時" 
                control={<Radio color="primary" />} label="13時" />
              <FormControlLabel value="14時" 
                control={<Radio color="primary" />} label="14時" />
              <FormControlLabel value="15時" 
                control={<Radio color="primary" />} label="15時" />
              <FormControlLabel value="16時" 
                control={<Radio color="primary" />} label="16時" />
              <FormControlLabel value="17時" 
                control={<Radio color="primary" />} label="17時" />
              <FormControlLabel value="18時" 
                control={<Radio color="primary" />} label="18時" />
            </RadioGroup>
          </FormLabel>
        </Grid>
        </Grid>
        <div className={classes.root}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Payment</FormLabel>
            <RadioGroup aria-label="payment" name="payment" 
              value={value} onChange={handleChange}>
              <FormControlLabel value="代金引換" 
                name="cash" id="0" control={<Radio />} 
                label="代金引換" />
              <FormControlLabel value="クレジットカード" 
                name="card" id="1" control={<Radio />} 
                label="クレジットカード" onClick={() => {}}/>
            </RadioGroup>
          </FormControl>
        </div>
        <Link to="/paymentform">
          <Button color="secondary">
            クレジットカードの場合
          </Button>
        </Link>
        <div className={classes.root}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            name="button"
            onClick={() => 
              orderClicked(destinationUserName,destinationEmail,destinationZipcode,destinationAddress,destinationTel,destinationDate,)}
          >
            この内容で注文する
          </Button>
            <Link to="/cartlist">
              <Button variant="outlined">ショッピングカートに戻る</Button>
            </Link>
        </div>
    </React.Fragment>
  );
};

export default OrderConfirm;
