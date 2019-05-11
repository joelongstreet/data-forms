import React from 'react';

import {
  Row,
  Col,
  Slider,
  InputNumber,
} from 'antd';

import SettingsContext from './Settings.context';

const defaultSliderStepSize = 0.01;
const defaultInputPrevision = 2;

function handleSelect(e) {
  const { target } = e;
  target.type = 'text';
  target.setSelectionRange(0, target.value.length);
  target.type = 'number';
}

function handleChange(val, stateSetter) {
  if (!val) return;

  const num = Number(val);
  if (Number.isNaN(num)) return;

  stateSetter(num);
}

function getInputPrecision(propsPrecision) {
  if (propsPrecision === 0) return 0;
  if (!propsPrecision) return defaultInputPrevision;
  return propsPrecision;
}

function UnitSlider(props) {
  const { inputPrecision } = props;
  const precision = getInputPrecision(inputPrecision);

  return (
    <SettingsContext.Consumer>
      {context => (
        <Row>
          <Col span={4}>
            <div style={{ marginTop: 7 }}>{props.label}</div>
          </Col>
          <Col span={13}>
            <Slider
              disabled={props.disabled}
              value={props.value}
              min={props.min}
              max={props.max}
              step={props.step || defaultSliderStepSize}
              onChange={props.onChange}
            />
          </Col>
          <Col span={6}>
            <InputNumber
              disabled={props.disabled}
              style={{ float: 'right' }}
              min={props.min}
              max={props.max}
              value={props.value}
              precision={precision}
              onChange={val => handleChange(val, props.onChange)}
              onClick={handleSelect}
              step={props.step || defaultSliderStepSize}
            />
          </Col>
          <Col span={1}>
            <span style={{ float: 'right', paddingTop: 8, fontSize: '85%' }}>
              {props.hideUnits ? '' : context.state.units}
            </span>
          </Col>
        </Row>
      )}
    </SettingsContext.Consumer>
  );
}

export default UnitSlider;
