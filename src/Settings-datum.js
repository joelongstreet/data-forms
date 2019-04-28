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

import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';
import * as Styles from './Styles';

const { Option } = Select;
const { TextArea } = Input;

const examples = [
  {
    title: 'Median Antarctic annual temperature (1900 - 2018)', // walnut on a dowel
    isolate: true,
  },
  {
    title: 'Daily S&P 500 closing price, grouped by financial quarter (2004 - 2012)',
    shapeSideCount: 1,
  },
  {
    title: 'Annual sum of singles, doubles and triples for the Kansas City Royals (1969-2018)', // blue plastic discs with labels
    isolate: true,
  },
];

/* eslint-disable react/no-array-index-key */
const examplesOptions = examples.map((e, i) => <Option key={i} value={i}>{e.title}</Option>);
/* eslint-enable react/no-array-index-key */

examplesOptions.push(
  <Option key="custom" value={examples.length}>Custom</Option>,
);

function handleExampleChange(val) {
  console.log(val);
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
