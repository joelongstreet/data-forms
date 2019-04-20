import React from 'react';
import {
  Col,
  Divider,
  Radio,
  Row,
  Select,
} from 'antd';

import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';

const { Option } = Select;
const presets = [
  {
    name: 'Epilog Fusion Pro 48',
    width: 48,
    height: 36,
  },
  {
    name: 'Epilog Fusion Pro 32',
    width: 32,
    height: 20,
  },
  {
    name: 'Epilog Helix',
    width: 24,
    height: 18,
  },
  {
    name: 'Epilog Mini 24',
    width: 18,
    height: 12,
  },
  {
    name: 'Epilog Mini 18',
    width: 18,
    height: 12,
  },
  {
    name: 'Epilog Zing 24',
    width: 24,
    height: 12,
  },
  {
    name: 'Epilog Zing 16',
    width: 16,
    height: 12,
  },
];

const presetOptions = presets.map((p, i) => <Option key={p.name} value={i}>{p.name}</Option>);
presetOptions.push(<Option key="default" value={presets.length}>Custom</Option>);

function handlePresetChange(val, context) {
  if (context.state.units !== 'in') {
    context.setUnits('in');
  }

  const current = { width: context.state.pageWidth, height: context.state.pageHeight };
  const dimensions = presets[val] || current;
  context.setPageHeight(dimensions.height);
  context.setPageWidth(dimensions.width);
}

function SettingsPage() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Divider>Setup</Divider>

          <Row style={{ marginBottom: 10 }}>
            <Col>
              <Radio.Group
                style={{ margin: 'auto', display: 'block', float: 'left' }}
                value={context.state.units}
                buttonStyle="solid"
                onChange={e => context.setUnits(e.target.value)}
              >
                <Radio.Button value="in">in</Radio.Button>
                <Radio.Button value="cm">cm</Radio.Button>
              </Radio.Group>
              <Select defaultValue={6} style={{ width: 200, float: 'right' }} onChange={val => handlePresetChange(val, context)}>
                {presetOptions}
              </Select>
            </Col>
          </Row>

          <UnitSlider
            label="Width"
            onChange={context.setPageWidth}
            value={context.state.pageWidth}
            min={0}
            max={context.state.pageWidthMax}
          />
          <UnitSlider
            label="Height"
            onChange={context.setPageHeight}
            value={context.state.pageHeight}
            min={0}
            max={context.state.pageHeightMax}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsPage;
