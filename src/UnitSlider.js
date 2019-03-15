import React from 'react';

import {
  Row,
  Col,
  Slider,
  InputNumber
} from 'antd';

import SettingsContext from './Settings.context';

function UnitSlider(props){
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <Row>
          <Col span={4}>
            <div style={{'marginTop': '7px'}}>{props.label}</div>
          </Col>
          <Col span={14}>
            <Slider
              value={props.value}
              min={props.min}
              max={props.max}
              step={props.step || context.state.defaultSliderStepSize}
              onChange={props.onChange}
            />
          </Col>
          <Col span={6}>
            <InputNumber
              style={{'float':'right'}}
              min={props.min}
              max={props.max}
              value={props.value}
              onChange={props.onChange}
              step={props.step || context.state.defaultSliderStepSize}
              formatter={(value) => {
                if (!props.hideUnits) {
                  return `${value} ${context.state.units}`;
                }
                return value;
              }}
              parser={value => value.replace(context.state.units, '')}
            />
          </Col>
          
        </Row>
      )}
    </SettingsContext.Consumer>
  );
}

export default UnitSlider;
