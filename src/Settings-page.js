import React from 'react';
import {
  Radio,
  Select
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
    height: 18
  },
  {
    name: 'Epilog Mini 24',
    width: 18,
    height: 12
  },
  {
    name: 'Epilog Mini 18',
    width: 18,
    height: 12
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

const presetOptions = presets.map((p, i) => {
  return <Option key={p.name} value={i}>{p.name}</Option>;
});
presetOptions.push(
  <Option key='default' value={presets.length}>Custom</Option>
);

function handlePresetChange(val, context) {
  if (context.state.units !== 'in') {
    context.setUnits('in');
  }

  const preset = presets[val];
  context.setPageHeight(preset.height);
  context.setPageWidth(preset.width);
}

function SettingsShape(){
  return (
    <SettingsContext.Consumer>
      {(context) => (
        <React.Fragment>
          <Radio.Group
            value={context.state.units}
            buttonStyle="solid"
            onChange={(e) => context.setUnits(e.target.value)}
          >
            <Radio.Button value="in">Inches</Radio.Button>
            <Radio.Button value="cm">Centimeters</Radio.Button>
          </Radio.Group>

          <Select defaultValue={6} style={{ width: 200 }} onChange={(val) => handlePresetChange(val, context)}>
            {presetOptions}
          </Select>

          <UnitSlider
            label="w"
            onChange={context.setPageWidth}
            value={context.state.pageWidth}
            min={0}
            max={context.state.pageWidthMax}
          />
          <UnitSlider
            label="h"
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

export default SettingsShape;