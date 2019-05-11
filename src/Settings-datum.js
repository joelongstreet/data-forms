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
  Tooltip,
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
            <Tooltip title="Load an example">
              <Divider>Example</Divider>
            </Tooltip>
            <Select
              defaultValue={defaultSelectValue}
              style={{ width: '100%' }}
              onChange={val => handleExampleChange(val, context)}
            >
              {examplesOptions}
            </Select>

            <Tooltip title="Control the interpretation of the data">
              <Divider style={Styles.divider}>Interpret</Divider>
            </Tooltip>

            <Row style={{ marginBottom: 20 }}>
              <Col span={12}>
                <Radio.Group
                  value={context.state.effectType}
                  onChange={e => context.setEffectType(e.target.value)}
                >
                  <Tooltip title="Draw the data as an etch">
                    <Radio.Button value="etch">Etch</Radio.Button>
                  </Tooltip>
                  <Tooltip title="Draw the data as a cut">
                    <Radio.Button value="cut">Cut</Radio.Button>
                  </Tooltip>
                </Radio.Group>
              </Col>
              <Col span={12}>
                <Tooltip title="Draw all data rows from the same origin">
                  <Checkbox
                    style={{ float: 'right' }}
                    checked={context.state.isSingleton}
                    onChange={e => context.setIsSingleton(e.target.checked)}
                  >
                    Overlap
                  </Checkbox>
                </Tooltip>
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

            <Tooltip title="Enter data">
              <Divider style={Styles.divider}>Entry</Divider>
            </Tooltip>
            <Row>
              <Col>
                <Tooltip title="Add zeros between each data point">
                  <Checkbox
                    style={{ float: 'right', marginBottom: 10 }}
                    checked={context.state.isDramatic}
                    onChange={e => context.setIsDramatic(e.target.checked)}
                  >
                    Dramatize
                  </Checkbox>
                </Tooltip>
              </Col>
            </Row>
            <TextArea
              rows={10}
              onClick={e => calculateTilePreviewPosition(e, context)}
              onKeyUp={e => calculateTilePreviewPosition(e, context)}
              value={context.state.datum}
              style={{ fontFamily: 'monospace', whiteSpace: 'nowrap' }}
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
