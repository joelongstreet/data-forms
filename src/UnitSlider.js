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
          <Col span={2}>
            {props.label}
          </Col>
          <Col span={12}>
            <Slider
              value={props.value}
              min={props.min}
              max={props.max}
              step={props.step || context.state.defaultSliderStepSize}
              onChange={props.onChange}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              style={{ marginLeft: 16 }}
              min={props.min}
              max={props.max}
              value={props.value}
              onChange={props.onChange}
            />
          </Col>
          <Col span={3}>
            { !props.hideUnits && context.state.units }
          </Col>
        </Row>
      )}
    </SettingsContext.Consumer>
  );
}

export default UnitSlider;
