import React from 'react';
import {
  Checkbox,
  Col,
  Divider,
  Radio,
  Row,
} from 'antd';

import UnitSlider from './UnitSlider';
import SettingsContext from './Settings.context';


function SettingsShape() {
  return (
    <SettingsContext.Consumer>
      {context => (
        <React.Fragment>
          <Divider>Form</Divider>

          <Row>
            <Col span={10} offset={2}>
              <Radio.Group
                value={context.state.shapeType}
                buttonStyle="solid"
                onChange={e => context.setShapeType(e.target.value)}
              >
                <Radio.Button value="surround">Surround</Radio.Button>
                <Radio.Button value="isolate">Isolate</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={10} offset={2}>
              <Radio.Group
                value={context.state.effectType}
                buttonStyle="solid"
                onChange={e => context.setEffectType(e.target.value)}
              >
                <Radio.Button value="etch" disabled={context.state.shapeType === 'isolate'}>Etch</Radio.Button>
                <Radio.Button value="cut">Cut</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>

          <Divider>Cell</Divider>

          <UnitSlider
            label="Size"
            onChange={context.setCellSize}
            value={context.state.cellSize}
            min={context.state.cellSizeMin}
            max={context.state.cellSizeMax}
          />

          { context.state.shapeType === 'surround' && (
          <UnitSlider
            label="Sides"
            onChange={context.setShapeSideCount}
            value={context.state.shapeSideCount}
            min={2}
            max={8}
            step={1}
            hideUnits
          />
          )}

          <Divider>Through</Divider>
          <Row>
            <Col>
              <Checkbox
                style={{ float: 'right', marginBottom: 20 }}
                checked={context.state.throughHoleExists}
                onChange={context.toggleThroughHoleExists}
              >
                Through Hole
              </Checkbox>
            </Col>
          </Row>

          <UnitSlider
            label="Radius"
            onChange={context.setThroughHoleRadius}
            value={context.state.throughHoleRadius}
            min={0}
            max={context.state.cellSize}
          />
          <UnitSlider
            label="X"
            onChange={context.setThroughHoleX}
            value={context.state.throughHoleX}
            min={0}
            max={context.state.cellSize}
          />
          <UnitSlider
            label="Y"
            onChange={context.setThroughHoleY}
            value={context.state.throughHoleY}
            min={0}
            max={context.state.cellSize}
          />
        </React.Fragment>
      )}
    </SettingsContext.Consumer>
  );
}

export default SettingsShape;
