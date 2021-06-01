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
// import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { addPaymentInfo } from '../reducks/users/operations';
import { getUserId } from '../reducks/users/selector';

const OrderConfirm = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  // const history = useHistory();
  const sumPrice = useLocation().state.sumPrice;
  const uid = getUserId(selector);

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
  }));

  const classes = useStyles();
  // const pattern = /^[0-9]{3}-[0-9]{4}$/;
  // const pattern2 = /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/;

  //初期値
  const [destinationUserName, setDestinationUserName] = useState('');
  // const [destinationEmail, setDestinationEmail] = useState('');
  const [destinationZipcode, setDestinationZipcode] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [destinationTel, setDestinationTel] = useState('');

  //配達日時
  const [destinationDate, setDestinationDate] = useState('');

  // const [destinationYear, setDestinationYear] = useState('');
  // const [destinationMonth, setDestinationMonth] = useState('');
  // const [destinationDay, setDestinationDay] = useState('');
  // const [destinationHour, setDestinationHour] = useState('');

  // const today = new Date();
  // const hour = today.getHours();
  // const numOrderDay = Number(destinationDay);
  // const numOrderTime = Number(destinationHour);

  //firebaseへ格納用
  // const destinationTime = destinationYear + destinationMonth + destinationDay + destinationHour;

  //支払い方法ラジオボタン
  const [paymentMethods, setPaymentMethods] = useState('');

  //支払い方法
  // const [cash, setCash] = useState('');
  const [creditCardNo, setCreditCardNo] = useState('');

  //入力値
  const inputOrderUserName = useCallback(
    (e) => {
      setDestinationUserName(e.target.value);
    },
    [setDestinationUserName]
  );

  // const inputOrderEmail = useCallback(
  //   (e) => {
  //     setDestinationEmail(e.target.value);
  //   },
  //   [setDestinationEmail]
  // );

  const inputOrderZipcode = useCallback(
    (e) => {
      setDestinationZipcode(e.target.value);
    },
    [setDestinationZipcode]
  );

  const inputOrderAddress = useCallback(
    (e) => {
      setDestinationAddress(e.target.value);
    },
    [setDestinationAddress]
  );

  const inputOrderTel = useCallback(
    (e) => {
      setDestinationTel(e.target.value);
    },
    [setDestinationTel]
  );

  const inputOrderDate = useCallback(
    (e) => {
      setDestinationDate(e.target.value);
    },
    [setDestinationDate]
  );

  // const inputOrderYear = useCallback(
  //   (e) => {
  //     setDestinationYear(e.target.value);
  //   },
  //   [setDestinationYear]
  // );

  // const inputOrderMonth = useCallback(
  //   (e) => {
  //     setDestinationMonth(e.target.value);
  //   },
  //   [setDestinationMonth]
  // );

  // const inputOrderDay = useCallback(
  //   (e) => {
  //     setDestinationDay(e.target.value);
  //   },
  //   [setDestinationDay]
  // );

  // const inputOrderHour = useCallback(
  //   (e) => {
  //     setDestinationHour(e.target.value);
  //   },
  //   [setDestinationHour]
  // );

  const inputOrderPay = useCallback(
    (e) => {
      setPaymentMethods(e.target.value);
    },
    [setPaymentMethods]
  );

  // const inputCash = useCallback((e) => {
  //   setCash(e.target.value)
  // },[setCash])

  const inputCreditCardNo = useCallback(
    (e) => {
      setCreditCardNo(e.target.value);
    },
    [setCreditCardNo]
  );

  //配達関連
  // const DeliveriesYears = [
  //   { value: '2021', label: '2021' },
  //   { value: '2022', label: '2022' },
  // ];

  // const DeliveriesMonths = [
  //   { value: '1', label: '1' },
  //   { value: '2', label: '2' },
  //   { value: '3', label: '3' },
  //   { value: '4', label: '4' },
  //   { value: '5', label: '5' },
  //   { value: '6', label: '6' },
  //   { value: '7', label: '7' },
  //   { value: '8', label: '8' },
  //   { value: '9', label: '9' },
  //   { value: '10', label: '10' },
  //   { value: '11', label: '11' },
  //   { value: '12', label: '12' },
  // ];

  // const DeliveriesDays = [
  //   { value: '1', label: '1' },
  //   { value: '2', label: '2' },
  //   { value: '3', label: '3' },
  //   { value: '4', label: '4' },
  //   { value: '5', label: '5' },
  //   { value: '6', label: '6' },
  //   { value: '7', label: '7' },
  //   { value: '8', label: '8' },
  //   { value: '9', label: '9' },
  //   { value: '10', label: '10' },
  //   { value: '11', label: '11' },
  //   { value: '12', label: '12' },
  //   { value: '13', label: '13' },
  //   { value: '14', label: '14' },
  //   { value: '15', label: '15' },
  //   { value: '16', label: '16' },
  //   { value: '17', label: '17' },
  //   { value: '18', label: '18' },
  //   { value: '19', label: '19' },
  //   { value: '20', label: '20' },
  //   { value: '21', label: '21' },
  //   { value: '22', label: '22' },
  //   { value: '23', label: '23' },
  //   { value: '24', label: '24' },
  //   { value: '25', label: '25' },
  //   { value: '26', label: '26' },
  //   { value: '27', label: '27' },
  //   { value: '28', label: '28' },
  //   { value: '29', label: '29' },
  //   { value: '30', label: '30' },
  //   { value: '31', label: '31' },
  // ];

  // const DeliveriesTimes = [
  //   { value: '8', label: '8' },
  //   { value: '9', label: '9' },
  //   { value: '10', label: '10' },
  //   { value: '11', label: '11' },
  //   { value: '12', label: '12' },
  //   { value: '13', label: '13' },
  //   { value: '14', label: '14' },
  //   { value: '15', label: '15' },
  //   { value: '16', label: '16' },
  //   { value: '17', label: '17' },
  //   { value: '18', label: '18' },
  // ];

  //データ・画面遷移
  // const orderClicked = (
  //   destinationUserName,
  //   destinationEmail,
  //   destinationZipcode,
  //   destinationAddress,
  //   destinationTel,
  //   destinationYear,
  //   destinationMonth,
  //   destinationDay,
  //   destinationHour,
  //   paymentMethods,
  //   creditCardNo
  // ) => {
  //   dispatch(
  //     OrderError(
  //       destinationUserName,
  //       destinationEmail,
  //       destinationZipcode,
  //       destinationAddress,
  //       destinationTel,
  //       destinationYear,
  //       destinationMonth,
  //       destinationDay,
  //       destinationHour,
  //       paymentMethods,
  //       creditCardNo
  //     )
  //   );

  //   // if(destinationUserName === '' ||
  //   //   destinationEmail === '' ||
  //   //   destinationZipcode  === '' ||
  //   //   destinationAddress === '' ||
  //   //   destinationTel === '' ||
  //   //   destinationYear === '' ||
  //   //   destinationMonth === '' ||
  //   //   destinationDay  === '' ||
  //   //   destinationHour === '' ||
  //   //   paymentMethods === '' ||
  //   //   creditCardNo === '')
  //   // {
  //   //   console.log('入力完了していません');

  //   // } else if((destinationEmail.indexOf('@') === -1) ||
  //   //   !pattern.test(destinationZipcode) ||
  //   //   !pattern2.test(destinationTel) ||
  //   //   (destinationDay === numOrderDay &&
  //   //       (numOrderTime - hour <= 3) ||
  //   //       (numOrderTime - hour === 0))) {
  //   //     console.log('入力完了していません2');
  //   // } else {
  //   history.push('/orderfinished');
  //   // }
  // };

  const [paymentValue, setPaymentValue] = useState('');
  const changePaymentValue = (e) => {
    setPaymentValue(e.target.value);
  };

  // const [cardValue, serCardValue] = useState('');
  // const changeCardValue = (e) => {
  //   serCardValue(e.target.value);
  // };

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
            label="名前"
            fullWidth
            autoComplete="given-name"
            placeholder="Enter your name"
            onChange={inputOrderUserName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            required
            id="mail"
            name="mail"
            label="Mail Address"
            fullWidth
            autoComplete="shipping mail"
            onChange={inputOrderEmail}
          /> */}
        </Grid>
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        {/* <Grid item xs={12}>
          <TextField
            required
            id="tel"
            name="tel"
            label="配達日時"
            fullWidth
            autoComplete="shipping phone"
            onChange={inputOrderTel}
          />
        </Grid> */}
        <Grid item xs={12}>
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
            >
              <FormControlLabel
                value="10時"
                labelPlacement="end"
                control={<Radio color="primary" />}
                label="10時"
              />
              <FormControlLabel
                value="11時"
                control={<Radio color="primary" />}
                label="11時"
              />
              <FormControlLabel
                value="12時"
                control={<Radio color="primary" />}
                label="12時"
              />
              <FormControlLabel
                value="13時"
                control={<Radio color="primary" />}
                label="13時"
              />
              <FormControlLabel
                value="14時"
                control={<Radio color="primary" />}
                label="14時"
              />
              <FormControlLabel
                value="15時"
                control={<Radio color="primary" />}
                label="15時"
              />
              <FormControlLabel
                value="16時"
                control={<Radio color="primary" />}
                label="16時"
              />
              <FormControlLabel
                value="17時"
                control={<Radio color="primary" />}
                label="17時"
              />
              <FormControlLabel
                value="18時"
                control={<Radio color="primary" />}
                label="18時"
              />
            </RadioGroup>
          </FormLabel>
        </Grid>
        {/* <form className={classes.root} noValidate>
          <div>
            <TextField
              id="destinationYear"
              select
              label="Delivery Year"
              value={destinationYear}
              onChange={inputOrderYear}
            >
              {DeliveriesYears.map((year) => (
                <MenuItem key={year.value} value={year.value}>
                  {year.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="destinationMonth"
              select
              label="Delivery Month"
              value={destinationMonth}
              onChange={inputOrderMonth}
            >
              {DeliveriesMonths.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="destinationDay"
              select
              label="Delivery Day"
              value={destinationDay}
              onChange={inputOrderDay}
            >
              {DeliveriesDays.map((day) => (
                <MenuItem key={day.value} value={day.value}>
                  {day.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="destinationHour"
              select
              label="Delivery Time"
              value={destinationHour}
              onChange={inputOrderHour}
            >
              {DeliveriesTimes.map((time) => (
                <MenuItem key={time.value} value={time.value}>
                  {time.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form> */}
        <Grid item xs={12}>
          <div className={classes.root}>
            <FormControl component="fieldset">
              <FormLabel component="legend">支払い方法</FormLabel>
              <RadioGroup
                aria-label="payment"
                name="payment"
                value={paymentMethods}
                onChange={inputOrderPay}
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
              {paymentMethods === '2' ? (
                <TextField
                  id="standard-basic"
                  label="Credit-card Number"
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
                destinationZipcode,
                destinationAddress,
                destinationTel,
                destinationDate,
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
    </React.Fragment>
  );
};

export default OrderConfirm;
