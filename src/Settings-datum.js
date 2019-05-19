import React from 'react';
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

import ExampleData from './Examples.data';
import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';
import * as Styles from './Styles';

const { Option } = Select;
const { TextArea } = Input;

/* eslint-disable react/no-array-index-key */
const examplesOptions = ExampleData.map((e, i) => <Option key={i} value={i}>{e.title}</Option>);
/* eslint-enable react/no-array-index-key */

function calculateTilePreviewPosition(e, context) {
  const { target } = e;
  const line = target.value.substr(0, target.selectionStart).split('\n').length;
  context.setTextAreaHighlightIndex(line);
}

function SettingsDatum() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Tooltip title="Load an example">
            <Divider>Example</Divider>
          </Tooltip>
          <Select
            placeholder="Change Example"
            value={context.state.activeExampleIndex}
            style={{ width: '100%' }}
            onChange={context.setActiveExampleIndex}
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
            step={0.01}
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

export default SettingsDatum;
