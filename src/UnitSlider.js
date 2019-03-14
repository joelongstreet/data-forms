import React from 'react';

import SettingsContext from './Settings.context'

import Slider from '@material-ui/lab/Slider';

function UnitSlider(props){
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <React.Fragment>
        <p>{props.label}</p>
        <input
          type='number'
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}>
        </input>
        <p>{context.state.units}</p>
        <Slider
          value={props.value}
          min={props.min}
          max={props.max}
          step={props.step}
          onChange={(e, val) => props.onChange(val)}
        />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  )
}

export default UnitSlider;