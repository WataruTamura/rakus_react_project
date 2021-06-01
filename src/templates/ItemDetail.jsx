import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  fetchTopping,
  fetchSumPrice,
  addOrdersInfo,
} from '../reducks/topping/operations';
import { getProducts } from '../reducks/products/selectors';
import { getTopping, getSumPrice } from '../reducks/topping/selectors';
import { Topping } from '../components/index';
import { getUserId } from '../reducks/users/selector';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 860,
    margin: '0 auto',
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: '0',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ItemDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLink = (path) => {
    history.push(path);
  };
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const topping = getTopping(selector);
  const sumPrice = getSumPrice(selector);
  const selectedId = useLocation().selectedItemId;
  const uid = getUserId(selector);
  const selectedItem =
    products === undefined
      ? ''
      : products.filter((product) => product.id === selectedId);
  const classes = useStyles();

  // アコーディオン
  const [expanded, setExpanded] = useState(false);

  // ラベル
  const [value, setValue] = useState('');
  const [LabelName, setLabelName] = useState('');
  const [toppings, setToppings] = useState('');

  const handleChangeLabel = (event) => {
    setValue(event.target.value);
    setLabelName(event.target.name);
  };

  // 数量
  const [num, setNum] = useState(1);
  const handleChangeNum = (event) => {
    setNum(event.target.value);
  };

  // トッピング
  const [onion, setOnion] = useState('');
  const [tsunamayo, setTsunamayo] = useState('');
  const [itarianTomato, setItarianTomato] = useState('');
  const [squid, setSquid] = useState('');
  const [bulgogi, setBulgogi] = useState('');
  const [anchovy, setAnchovy] = useState('');
  const [shrimp, setShrimp] = useState('');
  const [corn, setCorn] = useState('');
  const [peppers, setPeppers] = useState('');
  const [freshSliced, setFreshSliced] = useState('');
  const [bacon, setBacon] = useState('');
  const [pepperoni, setPepperoni] = useState('');
  const [aged, setAged] = useState('');
  const [special, setSpecial] = useState('');
  const [camembert, setCamembert] = useState('');
  const [freshMozzarella, setFreshMozzarella] = useState('');
  const [italianSausage, setItalianSausage] = useState('');
  const [garlic, setGarlic] = useState('');
  const [arabiki, setArabiki] = useState('');
  const [broccoli, setBroccoli] = useState('');
  const [green, setGreen] = useState('');
  const [parmesan, setParmesan] = useState('');
  const [pineapple, setPineapple] = useState('');
  const [jalapeno, setJalapeno] = useState('');
  const [mochi, setMochi] = useState('');
  const [potato, setPoato] = useState('');
  const [black, setBlack] = useState('');
  const [cheese, setItariantomato] = useState('');

  useEffect(() => {
    dispatch(fetchTopping());
  }, [dispatch]);

  useEffect(() => {
    const sumPrice = [
      Number(value) * num,
      onion,
      tsunamayo,
      itarianTomato,
      squid,
      bulgogi,
      anchovy,
      shrimp,
      corn,
      peppers,
      freshSliced,
      bacon,
      pepperoni,
      aged,
      special,
      camembert,
      freshMozzarella,
      italianSausage,
      garlic,
      arabiki,
      broccoli,
      green,
      parmesan,
      pineapple,
      jalapeno,
      mochi,
      potato,
      black,
      cheese,
    ]
      .filter((price) => price !== '')
      .reduce((pre, cur) => pre + cur);
    dispatch(fetchSumPrice(sumPrice));
  }, [
    onion,
    tsunamayo,
    itarianTomato,
    squid,
    bulgogi,
    anchovy,
    shrimp,
    corn,
    peppers,
    freshSliced,
    bacon,
    pepperoni,
    aged,
    special,
    camembert,
    freshMozzarella,
    italianSausage,
    garlic,
    arabiki,
    broccoli,
    green,
    parmesan,
    pineapple,
    jalapeno,
    mochi,
    potato,
    black,
    cheese,
    value,
    num,
    dispatch,
  ]);

  useEffect(() => {
    if (topping === undefined) {
      return;
    } else {
      setToppings(
        [
          {
            toppingId: topping[0].id,
            toppingSize: onion === 200 ? 0 : onion === 300 ? 1 : '',
          },
          {
            toppingId: topping[1].id,
            toppingSize: tsunamayo === 200 ? 0 : tsunamayo === 300 ? 1 : '',
          },
          {
            toppingId: topping[2].id,
            toppingSize:
              itarianTomato === 200 ? 0 : itarianTomato === 300 ? 1 : '',
          },
          {
            toppingId: topping[3].id,
            toppingSize: squid === 200 ? 0 : squid === 300 ? 1 : '',
          },
          {
            toppingId: topping[4].id,
            toppingSize: bulgogi === 200 ? 0 : bulgogi === 300 ? 1 : '',
          },
          {
            toppingId: topping[5].id,
            toppingSize: anchovy === 200 ? 0 : anchovy === 300 ? 1 : '',
          },
          {
            toppingId: topping[6].id,
            toppingSize: shrimp === 200 ? 0 : shrimp === 300 ? 1 : '',
          },
          {
            toppingId: topping[7].id,
            toppingSize: corn === 200 ? 0 : corn === 300 ? 1 : '',
          },
          {
            toppingId: topping[8].id,
            toppingSize: peppers === 200 ? 0 : peppers === 300 ? 1 : '',
          },
          {
            toppingId: topping[9].id,
            toppingSize: freshSliced === 200 ? 0 : freshSliced === 300 ? 1 : '',
          },
          {
            toppingId: topping[10].id,
            toppingSize: bacon === 200 ? 0 : bacon === 300 ? 1 : '',
          },
          {
            toppingId: topping[11].id,
            toppingSize: pepperoni === 200 ? 0 : pepperoni === 300 ? 1 : '',
          },
          {
            toppingId: topping[12].id,
            toppingSize: aged === 200 ? 0 : aged === 300 ? 1 : '',
          },
          {
            toppingId: topping[13].id,
            toppingSize: special === 200 ? 0 : special === 300 ? 1 : '',
          },
          {
            toppingId: topping[14].id,
            toppingSize: camembert === 200 ? 0 : camembert === 300 ? 1 : '',
          },
          {
            toppingId: topping[15].id,
            toppingSize:
              freshMozzarella === 200 ? 0 : freshMozzarella === 300 ? 1 : '',
          },
          {
            toppingId: topping[16].id,
            toppingSize:
              italianSausage === 200 ? 0 : italianSausage === 300 ? 1 : '',
          },
          {
            toppingId: topping[17].id,
            toppingSize: garlic === 200 ? 0 : garlic === 300 ? 1 : '',
          },
          {
            toppingId: topping[18].id,
            toppingSize: arabiki === 200 ? 0 : arabiki === 300 ? 1 : '',
          },
          {
            toppingId: topping[19].id,
            toppingSize: broccoli === 200 ? 0 : broccoli === 300 ? 1 : '',
          },
          {
            toppingId: topping[20].id,
            toppingSize: green === 200 ? 0 : green === 300 ? 1 : '',
          },
          {
            toppingId: topping[21].id,
            toppingSize: parmesan === 200 ? 0 : parmesan === 300 ? 1 : '',
          },
          {
            toppingId: topping[22].id,
            toppingSize: pineapple === 200 ? 0 : pineapple === 300 ? 1 : '',
          },
          {
            toppingId: topping[23].id,
            toppingSize: jalapeno === 200 ? 0 : jalapeno === 300 ? 1 : '',
          },
          {
            toppingId: topping[24].id,
            toppingSize: mochi === 200 ? 0 : mochi === 300 ? 1 : '',
          },
          {
            toppingId: topping[25].id,
            toppingSize: potato === 200 ? 0 : potato === 300 ? 1 : '',
          },
          {
            toppingId: topping[26].id,
            toppingSize: black === 200 ? 0 : black === 300 ? 1 : '',
          },
          {
            toppingId: topping[27].id,
            toppingSize: cheese === 200 ? 0 : cheese === 300 ? 1 : '',
          },
        ].filter((topping) => topping.toppingSize !== '')
      );
    }
  }, [
    onion,
    tsunamayo,
    itarianTomato,
    squid,
    bulgogi,
    anchovy,
    shrimp,
    corn,
    peppers,
    freshSliced,
    bacon,
    pepperoni,
    aged,
    special,
    camembert,
    freshMozzarella,
    italianSausage,
    garlic,
    arabiki,
    broccoli,
    green,
    parmesan,
    pineapple,
    jalapeno,
    mochi,
    potato,
    black,
    cheese,
    topping,
  ]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleChangeOnion = (event) => {
    setOnion(event.target.value);
  };
  const handleChangeTsunamayo = (event) => {
    setTsunamayo(event.target.value);
  };
  const handleChangeItarianTomato = (event) => {
    setItarianTomato(event.target.value);
  };
  const handleChangeSquid = (event) => {
    setSquid(event.target.value);
  };
  const handleChangeBulgogi = (event) => {
    setBulgogi(event.target.value);
  };
  const handleChangeAnchovy = (event) => {
    setAnchovy(event.target.value);
  };
  const handleChangeShrimp = (event) => {
    setShrimp(event.target.value);
  };
  const handleChangeCorn = (event) => {
    setCorn(event.target.value);
  };
  const handleChangePeppers = (event) => {
    setPeppers(event.target.value);
  };
  const handleChangeFreshSliced = (event) => {
    setFreshSliced(event.target.value);
  };
  const handleChangeBacon = (event) => {
    setBacon(event.target.value);
  };
  const handleChangePepperoni = (event) => {
    setPepperoni(event.target.value);
  };
  const handleChangeAged = (event) => {
    setAged(event.target.value);
  };
  const handleChangeSpecial = (event) => {
    setSpecial(event.target.value);
  };
  const handleChangeCamembert = (event) => {
    setCamembert(event.target.value);
  };
  const handleChangeFreshMozzarella = (event) => {
    setFreshMozzarella(event.target.value);
  };
  const handleChangeItalianSausage = (event) => {
    setItalianSausage(event.target.value);
  };
  const handleChangeGarlic = (event) => {
    setGarlic(event.target.value);
  };
  const handleChangeArabiki = (event) => {
    setArabiki(event.target.value);
  };
  const handleChangeBroccoli = (event) => {
    setBroccoli(event.target.value);
  };
  const handleChangeGreen = (event) => {
    setGreen(event.target.value);
  };
  const handleChangeParmesan = (event) => {
    setParmesan(event.target.value);
  };
  const handleChangePineapple = (event) => {
    setPineapple(event.target.value);
  };
  const handleChangeJalapeno = (event) => {
    setJalapeno(event.target.value);
  };
  const handleChangeMochi = (event) => {
    setMochi(event.target.value);
  };
  const handleChangePotato = (event) => {
    setPoato(event.target.value);
  };
  const handleChangeBlack = (event) => {
    setBlack(event.target.value);
  };
  const handleChangeCheese = (event) => {
    setItariantomato(event.target.value);
  };

  return (
    <>
      {products === undefined ? (
        ''
      ) : (
        <Card className={classes.root}>
          <CardHeader
            className="detail-title"
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                P
              </Avatar>
            }
            title={selectedItem[0].name}
          />
          <CardMedia
            className={classes.media}
            image={selectedItem[0].imagePath}
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {selectedItem[0].discription}
            </Typography>
          </CardContent>
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend" className="sum-money">
                合計金額&nbsp;
                {sumPrice === undefined ? sumPrice : sumPrice.toLocaleString()}
                円
              </FormLabel>
            </FormControl>
          </CardContent>
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">サイズ</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
                value={value}
                onChange={handleChangeLabel}
              >
                <FormControlLabel
                  name="0"
                  value={String(selectedItem[0].Mprice)}
                  control={<Radio color="primary" />}
                  label={`M: ${selectedItem[0].Mprice.toLocaleString()}円`}
                />
                <FormControlLabel
                  name="1"
                  value={String(selectedItem[0].Lprice)}
                  control={<Radio color="primary" />}
                  label={`L: ${selectedItem[0].Lprice.toLocaleString()}円`}
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
          <CardContent>
            <FormLabel component="legend">数量</FormLabel>
            <FormControl variant="outlined" className={classes.formControl}>
              <NativeSelect
                onChange={handleChangeNum}
                defaultValue={1}
                inputProps={{
                  name: 'name',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
              </NativeSelect>
            </FormControl>
          </CardContent>
          <CardActions disableSpacing className="toggle">
            <CardContent onClick={handleExpandClick}>
              追加トッピング
            </CardContent>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                トッピング： 1つにつき&nbsp;&nbsp;&nbsp;+1倍
                200円(税抜)&nbsp;&nbsp;&nbsp; +2倍 300円(税抜)
              </Typography>
            </CardContent>
            <CardContent>
              {topping === undefined ? (
                ''
              ) : (
                <>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[0].name}
                      value={onion}
                      onChange={handleChangeOnion}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[1].name}
                      value={tsunamayo}
                      onChange={handleChangeTsunamayo}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[2].name}
                      value={itarianTomato}
                      onChange={handleChangeItarianTomato}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[3].name}
                      value={squid}
                      onChange={handleChangeSquid}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[4].name}
                      value={bulgogi}
                      onChange={handleChangeBulgogi}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[5].name}
                      value={anchovy}
                      onChange={handleChangeAnchovy}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[6].name}
                      value={shrimp}
                      onChange={handleChangeShrimp}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[7].name}
                      value={corn}
                      onChange={handleChangeCorn}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[8].name}
                      value={peppers}
                      onChange={handleChangePeppers}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[9].name}
                      value={freshSliced}
                      onChange={handleChangeFreshSliced}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[10].name}
                      value={bacon}
                      onChange={handleChangeBacon}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[11].name}
                      value={pepperoni}
                      onChange={handleChangePepperoni}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[12].name}
                      value={aged}
                      onChange={handleChangeAged}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[13].name}
                      value={special}
                      onChange={handleChangeSpecial}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[14].name}
                      value={camembert}
                      onChange={handleChangeCamembert}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[15].name}
                      value={freshMozzarella}
                      onChange={handleChangeFreshMozzarella}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[16].name}
                      value={italianSausage}
                      onChange={handleChangeItalianSausage}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[17].name}
                      value={garlic}
                      onChange={handleChangeGarlic}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[18].name}
                      value={arabiki}
                      onChange={handleChangeArabiki}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[19].name}
                      value={broccoli}
                      onChange={handleChangeBroccoli}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[20].name}
                      value={green}
                      onChange={handleChangeGreen}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[21].name}
                      value={parmesan}
                      onChange={handleChangeParmesan}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[22].name}
                      value={pineapple}
                      onChange={handleChangePineapple}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[23].name}
                      value={jalapeno}
                      onChange={handleChangeJalapeno}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[24].name}
                      value={mochi}
                      onChange={handleChangeMochi}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[25].name}
                      value={potato}
                      onChange={handleChangePotato}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[26].name}
                      value={black}
                      onChange={handleChangeBlack}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <Topping
                      name={topping[27].name}
                      value={cheese}
                      onChange={handleChangeCheese}
                      className={classes.selectEmpty}
                    />
                  </FormControl>
                </>
              )}
            </CardContent>
          </Collapse>
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                uid
                  ? dispatch(
                      addOrdersInfo(selectedId, num, LabelName, toppings, uid)
                    )
                  : handleLink('/login');
              }}
            >
              カートに追加
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ItemDetail;
