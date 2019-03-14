import React from 'react';

import Slider from '@material-ui/lab/Slider';

function UnitSlider(props){
  return (
    <React.Fragment>
      <p>{props.label}</p>
      <input
        type='number'
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}>
      </input>
      <Slider
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={(e, val) => props.onChange(val)}
      />
    </React.Fragment>
  )
}

export default UnitSlider;