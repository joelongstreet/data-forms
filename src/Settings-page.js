import React from 'react';
import {
  Button,
  Col,
  Divider,
  Radio,
  Row,
  Select,
  Tooltip,
} from 'antd';

import * as Styles from './Styles';
import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';
import downloadSvgDocument from './Download';

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

          <Row style={{ marginBottom: 20 }}>
            <Col>
              <Radio.Group
                style={{ textAlign: 'center', width: '100%' }}
                value={context.state.units}
                onChange={e => context.setUnits(e.target.value)}
              >
                <Tooltip title="Set the document to standard units">
                  <Radio.Button value="in">in</Radio.Button>
                </Tooltip>
                <Tooltip title="Set the document to metric units">
                  <Radio.Button value="cm">cm</Radio.Button>
                </Tooltip>
              </Radio.Group>
            </Col>
          </Row>

          <Tooltip title="Load a document preset">
            <Select
              defaultValue={6}
              style={{ width: '100%', marginBottom: 15 }}
              onChange={val => handlePresetChange(val, context)}
            >
              {presetOptions}
            </Select>
          </Tooltip>

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

          <Divider style={Styles.divider} />
          <Button
            type="default"
            block
            onClick={downloadSvgDocument}
            style={{ display: 'block', margin: 'auto', backgroundColor: Styles.colors[10] }}
          >
            Download SVG
          </Button>
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsPage;
