import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '20px auto 40px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = (props) => {
  const [text, setText] = useState('');
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="商品名で検索"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() => {
          props.setText(text);
          setText('');
        }}
      >
        <SearchIcon />
      </IconButton>

      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={() => {
          setText('');
        }}
      >
        <HighlightOffIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
