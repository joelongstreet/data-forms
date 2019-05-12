import React from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Col,
  Divider,
  Radio,
  Row,
  Select,
  Tooltip,
  notification,
} from 'antd';

import * as Styles from './Styles';
import { svgDownloadContainerId } from './util';
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

function handlePresetChange(val, context) {
  if (context.state.units !== 'in') {
    context.setUnits('in');
  }

  const current = { width: context.state.pageWidth, height: context.state.pageHeight };
  const dimensions = presets[val] || current;
  context.setPageHeight(dimensions.height);
  context.setPageWidth(dimensions.width);
}

function downloadSvgDocument() {
  const documentContainer = document.getElementById(svgDownloadContainerId);
  const svgDocument = documentContainer.innerHTML;
  const file = `data:application/octet-stream;base64,${window.btoa(svgDocument)}`;

  const timestamp = dayjs().format('YYYY-MM-DDTHH:mm');

  notification.warning({
    message: 'Warning',
    description: 'DataForms outputs cut files as SVG. Before sending to laser cutter, change the document settings to standard or metric units with 72 DPI. If the document is setup properly, the document dimensions in the vector graphics editor will match the dimensions listed on the page tab from DataForms. Cut line strokes will be set to 0.001 inches if using standard units, etch lines set to the specified etch width in DataForms.',
    duration: 0,
    style: {
      backgroundColor: 'rgb(26, 31, 42)',
    },
  });

  const aLink = document.createElement('a');
  aLink.download = `DataForms ${timestamp}.svg`;
  aLink.href = file;
  aLink.dispatchEvent(new window.MouseEvent('click'));
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
            type="primary"
            onClick={downloadSvgDocument}
            style={{ display: 'block', margin: 'auto' }}
          >
            Download Cut File
          </Button>
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsPage;
