import React from 'react';
import {
  Checkbox,
  Col,
  Divider,
  Radio,
  Row,
  Select,
  Tooltip,
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

function getDefaultCurve(curveType) {
  return curves.findIndex(c => c.functionName === curveType);
}

function getCurrentCurve(curveType) {
  const curve = curves.find(c => c.functionName === curveType);
  return curve.title;
}

function getSurroundTooltipTitle(isSingleton) {
  if (isSingleton) {
    return 'Surround disabled in singleton mode. Uncheck "Singleton" in the data tab to enable surrounds';
  }
  return 'Toggle the surrounding cut shape';
}

function getThroughTooltipTitle(isSingleton) {
  if (isSingleton) {
    return 'Through disabled in singleton mode. Uncheck "Singleton" in the data tab to enable throughs';
  }
  return 'Toggle the through hole';
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
          <Tooltip title="Encapsulate the data in a shape">
            <Divider>Surround</Divider>
          </Tooltip>
          <Row>
            <Col>
              <Tooltip title={getSurroundTooltipTitle(context.state.isSingleton)}>
                <Checkbox
                  style={{ float: 'right', marginBottom: 10 }}
                  disabled={context.state.isSingleton}
                  checked={context.state.showSurround}
                  onChange={e => context.setShowSurround(e.target.checked)}
                >
                  Show
                </Checkbox>
              </Tooltip>
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
            inputPrecision={0}
            min={2}
            max={8}
            step={1}
            hideUnits
          />

          <Tooltip title="Add a cut hole. Used to tie components together or mount data on a string">
            <Divider style={Styles.divider}>Through</Divider>
          </Tooltip>
          <Row>
            <Col>
              <Tooltip title={getThroughTooltipTitle(context.state.isSingleton)}>
                <Checkbox
                  style={{ float: 'right', marginBottom: 10 }}
                  disabled={context.state.isSingleton}
                  checked={context.state.throughHoleExists}
                  onChange={e => context.setThroughHoleExists(e.target.checked)}
                >
                  Show
                </Checkbox>
              </Tooltip>
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
          <Tooltip title="Control the shape of the data">
            <Divider style={Styles.divider}>Curve</Divider>
          </Tooltip>
          <Row style={{ marginBottom: 20 }}>
            <Col span={12}>
              <Radio.Group
                value={context.state.lineType}
                onChange={e => context.setLineType(e.target.value, true)}
              >
                <Tooltip title="Wrap the data around a circle">
                  <Radio.Button value="radial">Radial</Radio.Button>
                </Tooltip>
                <Tooltip title="Draw the data linearly">
                  <Radio.Button value="linear">Linear</Radio.Button>
                </Tooltip>
              </Radio.Group>
            </Col>
            <Col span={12}>
              <Tooltip title="Force the path to close. Used for non closing curve types (Natural, Step, etc.)">
                <Checkbox
                  style={{ float: 'right' }}
                  checked={context.state.forceClose}
                  disabled={context.state.lineType === 'linear'}
                  onChange={e => context.setForceClose(e.target.checked)}
                >
                  Close Path
                </Checkbox>
              </Tooltip>
            </Col>
          </Row>
          <Tooltip title="Curve type">
            <Select
              defaultValue={getDefaultCurve(context.state.curveType)}
              style={{ width: '100%', marginBottom: 15 }}
              onChange={val => handleCurveChange(val, context)}
              value={getCurrentCurve(context.state.curveType)}
            >
              {curveOptions}
            </Select>
          </Tooltip>

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
          <UnitSlider
            label="Rotate"
            hideUnits
            onChange={context.setCurveRotation}
            value={context.state.curveRotation}
            inputPrecision={1}
            step={0.1}
            min={-180}
            max={180}
          />
          <UnitSlider
            label="Scale X"
            hideUnits
            onChange={context.setCurveScaleX}
            value={context.state.curveScaleX}
            min={-3}
            max={3}
          />
          <UnitSlider
            label="Scale Y"
            hideUnits
            onChange={context.setCurveScaleY}
            value={context.state.curveScaleY}
            min={-3}
            max={3}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsShape;
