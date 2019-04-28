import React from 'react';
import {
  Checkbox,
  Col,
  Divider,
  Input,
  Radio,
  Row,
  Select,
} from 'antd';

import Examples from './Examples';
import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';
import * as Styles from './Styles';

const { Option } = Select;
const { TextArea } = Input;

/* eslint-disable react/no-array-index-key */
const examplesOptions = Examples.map((e, i) => <Option key={i} value={i}>{e.title}</Option>);
/* eslint-enable react/no-array-index-key */

examplesOptions.push(
  <Option key="custom" value={Examples.length}>Custom</Option>,
);

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function handleExampleChange(val, context) {
  const { settings } = Examples[val];
  Object.keys(settings).forEach((settingKey) => {
    const fn = `set${capitalize(settingKey)}`;
    context[fn](settings[settingKey]);
  });
}

function SettingsDatum() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Divider>Example</Divider>
          <Select
            defaultValue={1}
            style={{ width: '100%' }}
            onChange={val => handleExampleChange(val, context)}
          >
            {examplesOptions}
          </Select>

          <Divider style={Styles.divider}>Interpret</Divider>

          <Row style={{ marginBottom: 20 }}>
            <Col>
              <Radio.Group
                value={context.state.effectType}
                onChange={e => context.setEffectType(e.target.value)}
                style={{ textAlign: 'center', width: '100%' }}
              >
                <Radio.Button value="etch" disabled={context.state.shapeType === 'isolate'}>Etch</Radio.Button>
                <Radio.Button value="cut">Cut</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          <UnitSlider
            label="Etch"
            onChange={context.setEtchWidth}
            value={context.state.etchWidth}
            min={context.state.etchWidthMin}
            step={0.001}
            max={context.state.etchWidthMax}
            disabled={context.state.effectType !== 'etch'}
          />

          <Divider style={Styles.divider}>Entry</Divider>
          <Row>
            <Col>
              <Checkbox
                style={{ float: 'right', marginBottom: 10 }}
                checked={context.state.isDramatic}
                onChange={e => context.setIsDramatic(e.target.checked)}
              >
                Dramatize
              </Checkbox>
            </Col>
          </Row>
          <TextArea
            rows={10}
            value={context.state.datum}
            style={{ fontFamily: 'monospace' }}
            onChange={e => context.setDatum(e.target.value)}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsDatum;
