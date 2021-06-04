import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { addPaymentInfo } from '../reducks/users/operations';
import { getUserId } from '../reducks/users/selector';
import Cart from '../components/Cart';

const OrderConfirm = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const sumPrice = useLocation().state.sumPrice;
  const uid = getUserId(selector);

  const [destinationUserName, setDestinationUserName] = useState('');
  const [destinationEmail, setDestinationEmail] = useState('');
  const [destinationZipcode, setDestinationZipcode] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationTel, setDestinationTel] = useState('');
  const [destinationDate, setDestinationDate] = useState('');
  const [destinationPreTime, setDestinationPreTime] = useState('');
  const [creditCardNo, setCreditCardNo] = useState('');
  const [paymentValue, setPaymentValue] = useState('');

  //名前
  const inputOrderUserName = useCallback(
    (e) => {
      setDestinationUserName(e.target.value);
    },
    [setDestinationUserName]
  );

  //メールアドレス
  const inputOrderEmail = useCallback(
    (e) => {
      setDestinationEmail(e.target.value);
    },
    [setDestinationEmail]
  );

  //郵便番号
  const inputOrderZipcode = useCallback(
    (e) => {
      setDestinationZipcode(e.target.value);
    },
    [setDestinationZipcode]
  );

  //メールアドレス
  const inputOrderAddress = useCallback(
    (e) => {
      setDestinationAddress(e.target.value);
    },
    [setDestinationAddress]
  );

  //電話番号
  const inputOrderTel = useCallback(
    (e) => {
      setDestinationTel(e.target.value);
    },
    [setDestinationTel]
  );

  //配達日
  const inputOrderDate = useCallback(
    (e) => {
      setDestinationDate(e.target.value);
    },
    [setDestinationDate]
  );

  // 配達希望時間
  const destinationPreTimeChange = useCallback(
    (e) => {
      setDestinationPreTime(e.target.value);
    },
    [setDestinationPreTime]
  );

  //支払い方法
  const changePaymentValue = useCallback(
    (e) => {
      setPaymentValue(e.target.value);
    },
    [setPaymentValue]
  );

  //カード番号
  const inputCreditCardNo = useCallback(
    (e) => {
      setCreditCardNo(e.target.value);
    },
    [setCreditCardNo]
  );

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '30ch',
      },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    wrapper: {
      paddingLeft: 50,
      paddingRight: 50,
      maxWidth: 900,
      margin: '0 auto',
    },
    padding: {
      paddingLeft: 50,
      paddingRight: 50,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <h2 className="center">注文確認画面</h2>
      <Cart />
      <div className={classes.padding}>
        <Typography variant="h6" gutterBottom>
          お届け先情報入力
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="username"
              name="username"
              label="名前"
              fullWidth
              autoComplete="given-name"
              onChange={inputOrderUserName}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Email"
              name="Email"
              label="メールアドレス"
              fullWidth
              autoComplete="given-name"
              onChange={inputOrderEmail}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zipCode"
              name="zipCode"
              label="郵便番号"
              fullWidth
              autoComplete="shipping postal-code"
              onChange={inputOrderZipcode}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="address"
              name="address"
              label="住所"
              fullWidth
              autoComplete="shipping address-line1"
              onChange={inputOrderAddress}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="tel"
              name="tel"
              label="電話番号"
              fullWidth
              autoComplete="shipping phone"
              onChange={inputOrderTel}
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <form className={classes.container} noValidate>
              <TextField
                id="date"
                label="配達日"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={inputOrderDate}
              />
            </form>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormLabel component="legend">
              配達時間
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
                onChange={destinationPreTimeChange}
              >
                <FormControlLabel
                  value="10"
                  labelPlacement="end"
                  control={<Radio color="primary" />}
                  label="10時"
                />
                <FormControlLabel
                  value="11"
                  control={<Radio color="primary" />}
                  label="11時"
                />
                <FormControlLabel
                  value="12"
                  control={<Radio color="primary" />}
                  label="12時"
                />
                <FormControlLabel
                  value="13"
                  control={<Radio color="primary" />}
                  label="13時"
                />
                <FormControlLabel
                  value="14"
                  control={<Radio color="primary" />}
                  label="14時"
                />
                <FormControlLabel
                  value="15"
                  control={<Radio color="primary" />}
                  label="15時"
                />
                <FormControlLabel
                  value="16"
                  control={<Radio color="primary" />}
                  label="16時"
                />
                <FormControlLabel
                  value="17"
                  control={<Radio color="primary" />}
                  label="17時"
                />
                <FormControlLabel
                  value="18"
                  control={<Radio color="primary" />}
                  label="18時"
                />
              </RadioGroup>
            </FormLabel>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.root}>
              <FormControl component="fieldset">
                <FormLabel component="legend">支払い方法</FormLabel>
                <RadioGroup
                  aria-label="payment"
                  name="payment"
                  value={paymentValue}
                >
                  <FormControlLabel
                    onChange={changePaymentValue}
                    value="1"
                    name="pay"
                    id="0"
                    control={<Radio />}
                    label="代金引換"
                  />
                  <FormControlLabel
                    onChange={changePaymentValue}
                    value="2"
                    name="pay"
                    id="1"
                    control={<Radio />}
                    label="クレジットカード"
                  />
                </RadioGroup>
                {paymentValue === '2' ? (
                  <TextField
                    id="standard-basic"
                    label="カード番号（VISA、JCB）"
                    name="cardNumber"
                    value={creditCardNo}
                    onChange={inputCreditCardNo}
                  />
                ) : (
                  ''
                )}
              </FormControl>
            </div>
          </Grid>
        </Grid>

        <div className={classes.root}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            name="button"
            onClick={() => {
              dispatch(
                addPaymentInfo(
                  uid,
                  destinationUserName,
                  destinationEmail,
                  destinationZipcode,
                  destinationAddress,
                  destinationTel,
                  destinationDate,
                  Number(destinationPreTime),
                  creditCardNo,
                  sumPrice,
                  Number(paymentValue)
                )
              );
            }}
          >
            この内容で注文する
          </Button>
          <Link to="/cartlist">
            <Button variant="outlined">ショッピングカートに戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
