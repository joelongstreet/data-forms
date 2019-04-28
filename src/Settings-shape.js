import React from 'react';
import {
  Checkbox,
  Col,
  Divider,
  Radio,
  Row,
  Select,
} from 'antd';

import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';
import * as Styles from './Styles';

const { Option } = Select;

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

/* eslint-disable react/no-array-index-key */
const curveOptions = curves.map((e, i) => <Option key={i} value={i}>{e.title}</Option>);
/* eslint-enable react/no-array-index-key */

function getDefaultCurve(context) {
  return curves.findIndex(c => c.functionName === context.state.curveType);
}

function handleCurveChange(val, context) {
  const curve = curves[val];
  context.setCurveType(curve.functionName);
}

function SettingsShape() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Divider>Surround</Divider>
          <Row>
            <Col>
              <Checkbox
                style={{ float: 'right', marginBottom: 10 }}
                checked={context.state.showSurround}
                onChange={e => context.setShowSurround(e.target.checked)}
              >
                Show
              </Checkbox>
            </Col>
          </Row>

          <UnitSlider
            label="Size"
            onChange={context.setCellSize}
            value={context.state.cellSize}
            min={context.state.cellSizeMin}
            max={context.state.cellSizeMax}
          />

          <UnitSlider
            label="Sides"
            disabled={!context.state.showSurround}
            onChange={context.setShapeSideCount}
            value={context.state.shapeSideCount}
            min={2}
            max={8}
            step={1}
            hideUnits
          />

          <Divider style={Styles.divider}>Through</Divider>
          <Row>
            <Col>
              <Checkbox
                style={{ float: 'right', marginBottom: 10 }}
                checked={context.state.throughHoleExists}
                onChange={e => context.setThroughHoleExists(e.target.checked)}
              >
                Show
              </Checkbox>
            </Col>
          </Row>

          <UnitSlider
            label="Radius"
            onChange={context.setThroughHoleRadius}
            value={context.state.throughHoleRadius}
            min={0}
            max={context.state.cellSize / 2}
            disabled={!context.state.throughHoleExists}
          />
          <UnitSlider
            label="X"
            onChange={context.setThroughHoleX}
            value={context.state.throughHoleX}
            min={0}
            max={context.state.cellSize}
            disabled={!context.state.throughHoleExists}
          />
          <UnitSlider
            label="Y"
            onChange={context.setThroughHoleY}
            value={context.state.throughHoleY}
            min={0}
            max={context.state.cellSize}
            disabled={!context.state.throughHoleExists}
          />

          <Divider style={Styles.divider}>Curve</Divider>
          <Row style={{ marginBottom: 20 }}>
            <Col span={12}>
              <Radio.Group
                value={context.state.lineType}
                onChange={e => context.setLineType(e.target.value)}
              >
                <Radio.Button value="radial">Radial</Radio.Button>
                <Radio.Button value="linear">Linear</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={12}>
              <Checkbox
                style={{ float: 'right' }}
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

          <UnitSlider
            label="Scale"
            hideUnits
            onChange={context.setCurveScale}
            value={context.state.curveScale}
            min={-2}
            max={2}
          />
          <UnitSlider
            label="X"
            onChange={context.setCurveOffsetX}
            value={context.state.curveOffsetX}
            min={-1 * context.state.cellSize}
            max={context.state.cellSize}
          />
          <UnitSlider
            label="Y"
            onChange={context.setCurveOffsetY}
            value={context.state.curveOffsetY}
            min={-1 * context.state.cellSize}
            max={context.state.cellSize}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsShape;
