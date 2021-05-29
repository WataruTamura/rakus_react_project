import React,{ useCallback, useState } from 'react';
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

const OrderConfirm = () => {
const dispatch = useDispatch();
const history = useHistory();

const [destinationUserName, setDestinationUserName] = useState("")

const [destinationEmail, setDestinationEmail] = useState("")

const [destinationZipcode, setDestinationZipcode] = useState("")

const [destinationAddress, setDestinationAddress] = useState("")

const [destinationAddress2, setDestinationAddress2] = useState("")

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

const inputOrderAddress2 = useCallback((e) => {
  setDestinationAddress2(e.target.value)
},[setDestinationAddress2]);

const inputOrderTel = useCallback((e) => {
  setDestinationTel(e.target.value)
},[setDestinationTel]);

const inputOrderDate = useCallback((e) => {
  setDestinationDate(e.target.value)
},[setDestinationDate]);


const orderClicked =(destinationUserName,destinationEmail) => {
  dispatch(OrderError(destinationUserName,destinationEmail))
  // history.push('/')
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
            id="orderName"
            name="orderName"
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
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12}>
            <TextField
            required
            id="address1"
            name="address1"
            label="Address line"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={inputOrderAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={inputOrderAddress2}
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="datetime-local"
          label="delivery day"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          />
        </Grid>
        </Grid>
        <Button
            type="button"
            variant="contained"
            color="primary"
            name="button"
            onClick={() => orderClicked(destinationUserName,destinationEmail)}
          >
            送信
          </Button>
    </React.Fragment>
  );
};

export default OrderConfirm;
