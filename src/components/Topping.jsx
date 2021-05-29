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
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={props.value}
        onChange={props.onChange}
        className={props.classNameSelect}
      >
        <MenuItem value="">
          <em>&nbsp;</em>
        </MenuItem>
        <MenuItem value={200}>+1倍</MenuItem>
        <MenuItem value={300}>+2倍</MenuItem>
      </Select>
    </>
  );
};

export default Topping;
