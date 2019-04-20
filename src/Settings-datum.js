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

import SettingsContext from './Settings.context';

const { Option } = Select;
const { TextArea } = Input;

/* eslint-disable no-multi-spaces */
const curves = [
  { functionName: 'curveBasis',             title: 'Basis'              },
  { functionName: 'curveBasisClosed',       title: 'BasisClosed'        },
  { functionName: 'curveCardinal',          title: 'Cardinal'           },
  { functionName: 'curveCardinalClosed',    title: 'Cardinal Closed'    },
  { functionName: 'curveCatmullRom',        title: 'Catmull-Rom'        },
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

function handleCurveChange(val, context) {
  const curve = curves[val];
  context.setCurveType(curve.functionName);
}

function SettingsDatum() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Divider>Examples</Divider>
          <Select
            defaultValue={1}
            style={{ width: '100%' }}
            onChange={val => handleExampleChange(val, context)}
          >
            {examplesOptions}
          </Select>

          <Divider style={{ marginTop: 50 }}>Curve</Divider>
          <Row style={{ marginBottom: 10 }}>
            <Col style={{ float: 'right' }}>
              <Checkbox
                checked={context.state.isDramatic}
                onChange={e => context.setIsDramatic(e.target.checked)}
              >
                Dramatize
              </Checkbox>
              <Checkbox
                checked={context.state.forceClose}
                disabled={context.state.lineType === 'linear'}
                onChange={e => context.setForceClose(e.target.checked)}
              >
                Close Path
              </Checkbox>
            </Col>
          </Row>
          <Select
            defaultValue={getDefaultCurve(context)}
            style={{ width: '100%', marginBottom: 15 }}
            onChange={val => handleCurveChange(val, context)}
          >
            {curveOptions}
          </Select>
          <Row style={{ marginBottom: 10 }}>
            <Col span={12}>
              <Radio.Group
                value={context.state.lineType}
                buttonStyle="solid"
                onChange={e => context.setLineType(e.target.value)}
              >
                <Radio.Button value="radial">Radial</Radio.Button>
                <Radio.Button value="linear">Linear</Radio.Button>
              </Radio.Group>
            </Col>

            <Col span={12}>
              <Radio.Group
                value={context.state.effectType}
                buttonStyle="solid"
                onChange={e => context.setEffectType(e.target.value)}
                style={{ float: 'right' }}
              >
                <Radio.Button value="etch" disabled={context.state.shapeType === 'isolate'}>Etch</Radio.Button>
                <Radio.Button value="cut">Cut</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          <Divider style={{ marginTop: 50 }}>Data Entry</Divider>
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
