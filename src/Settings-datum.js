import React from 'react';
import {
  Divider,
  Input,
  Select,
} from 'antd';

import SettingsContext from './Settings.context';

const { Option } = Select;
const { TextArea } = Input;

const examples = [
  {
    name: 'Median Antarctic annual temperature (1900 - 2018)', // walnut on a dowel
    isolate: true,
  },
  {
    name: 'Daily S&P 500 closing price, grouped by financial quarter (2004 - 2012)',
    shapeSideCount: 1,
  },
  {
    name: 'Annual sum of singles, doubles and triples for the Kansas City Royals (1969-2018)', // blue plastic discs with labels
    isolate: true,
  },
];

const examplesOptions = examples.map((e, i) => {
  return <Option key={i} value={i}>{e.name}</Option>;
});
examplesOptions.push(
  <Option key='custom' value={examples.length}>Custom</Option>
);

function handleExampleChange(val, context) {
  console.log(val);
}

function SettingsDatum() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Divider>Examples</Divider>
          <Select
            defaultValue={6}
            style={{ width: 500 }}
            onChange={val => handleExampleChange(val, context)}
          >
            {examplesOptions}
          </Select>
          <Divider>Data Entry</Divider>
          <TextArea
            rows={10}
            value={context.state.datum}
            onChange={e => context.setDatum(e.target.value)}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsDatum;
