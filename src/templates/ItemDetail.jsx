import React, { useEffect,useState } from 'react';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTopping } from '../reducks/topping/operations';
import { getProducts } from '../reducks/products/selectors';
import { getTopping } from '../reducks/topping/selectors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: '0 auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
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

const ItemDetail = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const topping = getTopping(selector);
  const selectedId = useLocation().selectedItemId;
  const selectedItem = products.filter((product) => product.id === selectedId);

  console.log(topping);

  useEffect(() => {
    dispatch(fetchTopping());
  }, [dispatch]);

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [age, setAge] = useState('');
  // const [onion, setOnion] = useState('');
  // const [tsunamayo, setTsunamayo] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              P
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={selectedItem[0].name}
          subheader="September 14, 2016"
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
            <FormLabel component="legend">サイズ</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="Mprice"
                control={<Radio color="primary" />}
                label={`M:${selectedItem[0].Mprice}`}
              />
              <FormControlLabel
                value="Lprice"
                control={<Radio color="primary" />}
                label={`L:${selectedItem[0].Lprice}`}
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <CardContent>
          <FormLabel component="legend">数量</FormLabel>
          <FormControl variant="outlined" className={classes.formControl}>
            <NativeSelect
              defaultValue={1}
              inputProps={{
                name: 'name',
                id: 'uncontrolled-native',
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </NativeSelect>
          </FormControl>
        </CardContent>
        <CardActions disableSpacing>
          <CardContent>トッピングはこちら</CardContent>
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
            {topping === undefined
              ? ''
              : topping.map((topping) => {
                  return (
                    <FormControl
                      className={classes.formControl}
                      key={topping.id}
                    >
                      <InputLabel
                        shrink
                        id="demo-simple-select-placeholder-label-label"
                      >
                        {topping.name}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-placeholder-label-label"
                        id="demo-simple-select-placeholder-label"
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                      >
                        {/* <MenuItem value="">
                          <em>None</em>
                        </MenuItem> */}
                        <MenuItem value={1}>+1倍</MenuItem>
                        <MenuItem value={2}>+2倍</MenuItem>
                        {/* <MenuItem value={30}>Thirty</MenuItem> */}
                      </Select>
                      <FormHelperText>Label + placeholder</FormHelperText>
                    </FormControl>
                  );
                })}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default ItemDetail;
