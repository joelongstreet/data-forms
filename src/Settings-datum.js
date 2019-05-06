import React, { Component } from 'react';
import { random } from 'lodash';
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

function calculateTilePreviewPosition(e, context) {
  const { target } = e;
  const line = target.value.substr(0, target.selectionStart).split('\n').length;
  context.setTextAreaHighlightIndex(line);
}

const defaultSelectValue = random(0, Examples.length - 1);

class SettingsDatum extends Component {
  componentDidMount() {
    handleExampleChange(defaultSelectValue, this.context);
  }

  render() {
    return (
      <SettingsContext.Consumer>
        {context => (
          <React.Fragment>
            <Divider>Example</Divider>
            <Select
              defaultValue={defaultSelectValue}
              style={{ width: '100%' }}
              onChange={val => handleExampleChange(val, context)}
            >
              {examplesOptions}
            </Select>

            <Divider style={Styles.divider}>Interpret</Divider>

            <Row style={{ marginBottom: 20 }}>
              <Col span={12}>
                <Radio.Group
                  value={context.state.effectType}
                  onChange={e => context.setEffectType(e.target.value)}
                >
                  <Radio.Button value="etch" disabled={context.state.shapeType === 'isolate'}>Etch</Radio.Button>
                  <Radio.Button value="cut">Cut</Radio.Button>
                </Radio.Group>
              </Col>
              <Col span={12}>
                <Checkbox
                  style={{ float: 'right' }}
                  checked={context.state.isSingleton}
                  onChange={e => context.setIsSingleton(e.target.checked)}
                >
                  Singleton
                </Checkbox>
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
              onClick={e => calculateTilePreviewPosition(e, context)}
              onKeyUp={e => calculateTilePreviewPosition(e, context)}
              value={context.state.datum}
              style={{ fontFamily: 'monospace' }}
              onChange={e => context.setDatum(e.target.value)}
            />
          </React.Fragment>
        )}
      </SettingsContext.Consumer>
    );
  }
}

SettingsDatum.contextType = SettingsContext;
export default SettingsDatum;
