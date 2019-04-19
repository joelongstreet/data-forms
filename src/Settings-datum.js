import React from 'react';
import {
  Checkbox,
  Divider,
  Form,
  Input,
  Select,
} from 'antd';

import SettingsContext from './Settings.context';

const { Option } = Select;
const { TextArea } = Input;

/* eslint-disable no-multi-spaces */
const curves = [
  { functionName: 'curveBasis',             title: 'Basis'              },
  { functionName: 'curveBasisClosed',       title: 'BasisClosed'        },
  { functionName: 'curveCardinal',          title: 'Cardinal'           },
  { functionName: 'curveCardinalClosed',    title: 'Cardinal Closed'    },
  { functionName: 'curveCatmullRom',        title: 'CatmullRom'         },
  { functionName: 'curveCatmullRomClosed',  title: 'Catmull-Rom Closed' },
  { functionName: 'curveLinear',            title: 'Linear'             },
  { functionName: 'curveLinearClosed',      title: 'Linear Closed'      },
  { functionName: 'curveMonotoneX',         title: 'MonotoneX'          },
  { functionName: 'curveMonotoneY',         title: 'MonotoneY'          },
  { functionName: 'curveNatural',           title: 'Natural'            },
  { functionName: 'curveStep',              title: 'Step'               },
  { functionName: 'curveStepAfter',         title: 'Step After'         },
  { functionName: 'curveStepBefore',        title: 'Step Before'        },
];
/* eslint-enable no-multi-spaces */

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
const curveOptions = curves.map((e, i) => <Option key={i} value={i}>{e.title}</Option>);
/* eslint-enable react/no-array-index-key */

examplesOptions.push(
  <Option key="custom" value={examples.length}>Custom</Option>,
);


function getDefaultCurve(context) {
  return curves.findIndex(c => c.functionName === context.state.curveType);
}

function handleExampleChange(val) {
  console.log(val);
}

function handleDramatizeChange(val, context) {
  context.setIsDramatic(val);
}

function handleForceCloseChange(val, context) {
  context.setForceClose(val);
}

function handleCurveChange(val, context) {
  const curve = curves[val];
  context.setCurveType(curve.functionName);
}

function SettingsDatum() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Divider>Draw</Divider>
          <Form.Item label="Curve Stye">
            <Select
              defaultValue={getDefaultCurve(context)}
              style={{ width: '100%' }}
              onChange={val => handleCurveChange(val, context)}
            >
              {curveOptions}
            </Select>
          </Form.Item>
          <Checkbox
            checked={context.state.isDramatic}
            onChange={e => handleDramatizeChange(e.target.checked, context)}
          >
            Dramatize
          </Checkbox>
          <Checkbox
            checked={context.state.forceClose}
            onChange={e => handleForceCloseChange(e.target.checked, context)}
          >
            ForceClose
          </Checkbox>
          <Divider>Examples</Divider>
          <Select
            defaultValue={1}
            style={{ width: '100%' }}
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
