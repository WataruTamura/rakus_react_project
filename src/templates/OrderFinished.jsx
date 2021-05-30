import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core";
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    "& > *": {
      marginLeft: "auto",
      marginRight: "auto",
      width: theme.spacing(50),
    },
  },
  center: {
      textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const OrderFinished = () => {
  const classes = useStyles();
  return (
    <div  className={classes.center}>
      <h2>決済が完了しました！</h2>
        <p>この度はご注文いただきましてありがとうございます！</p>
        <p>お支払い先はお送りしたメールに記載してありますのでご確認ください。</p>
        <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
        <Link to="/">
          <Button variant="outlined" className={classes.submit}>トップ画面に戻る</Button>
        </Link>
      </div>
  );
};

export default OrderFinished;
