import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const Topping = (props) => {
  return (
    <>
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        {props.name}
      </InputLabel>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={props.value}
        onChange={props.onChange}
        displayEmpty
        className={props.classNameSelect}
      >
        <MenuItem value={1}>+1倍</MenuItem>
        <MenuItem value={2}>+2倍</MenuItem>
      </Select>
    </>
  );
};

export default Topping;
